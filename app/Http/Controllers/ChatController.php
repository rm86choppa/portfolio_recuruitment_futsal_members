<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\PusherChat;
use App\Post;
use Illuminate\Support\Facades\DB;
use App\Chat;
use App\User;

class ChatController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //.env に APP_ENV=local (ローカル環境) または APP_ENV=testing (テスト環境) と書いてある場合
        if ( app()->isLocal() || app()->runningUnitTests() ) { 
            // テスト環境, ローカル環境用の記述
            //テスト的に認証なしでも機能を使用する
        }
        //.env に APP_ENV=production (本番環境) などと書いてあった場合
        else { 
            // 本番環境用の記述
            $this->middleware('auth');
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //投稿に対してチャットするためチャットボタン押下した投稿情報を取得        
        $post = Post::find($request->post_id);

        $id = $request->my_user_id;
        //自分と相手のチャット情報取得(チャット履歴を更新履歴の昇順)
        $chats = Chat::where('post_id', intval($request->post_id))
                     ->where(function($query) use($post,$request){
                        $query->where('send_user_id', intval($request->send_user_id))
                              ->where('my_user_id', intval($request->my_user_id))
                              ->orwhere('send_user_id', intval($request->my_user_id))
                              ->where('my_user_id', intval($request->send_user_id));
                        })
                      ->orderby('created_at', 'asc')->get();

        $send_user_id = $request->send_user_id;
        $chat_channel = $request->chat_channel;
        $notification_channel = $request->notification_channel;

        return view('chat', compact('post','send_user_id', 'chats', 'notification_channel', 'chat_channel'));
    }

    public function chatSend(Request $request) {
        $chat = $request->all();

        DB::beginTransaction();
        try {

            //投稿内容を新規追加
            $chat_obj = new Chat;
            $chat_obj->fill($chat)->save();

            $updated_at = $chat_obj->updated_at;
            $chat['updated_at'] = $updated_at->format('Y-m-d H:i:s');

            DB::commit();

        } catch (\Exception $e) {
            DB::rollback();
            \Session::flash('flash_message', '登録が失敗しました');
            return back();
        }
        
        //チャット通知用イベント
        $post_user_id = Post::where('id', $chat['post_id'])->value('user_id');//投稿した相手にチャット通知するためユーザID取得
        $chat['channel'] = $chat['chat_channel'];
        $chat['chat_start_user_name'] = User::where('id', $chat['my_user_id'])->value('name');//チャット通知したときに、チャットリンク作成で使用
        event(new PusherChat($chat));

        //DB登録成功でpusherへチャット送信イベント発火(チャットのやり取り専用のチャンネル、チャット通知用チャンネルの2チャンネル作成)
        $chat['channel'] = $chat['notification_channel'];
        event(new PusherChat($chat));

        return response()->json();

    }
}
