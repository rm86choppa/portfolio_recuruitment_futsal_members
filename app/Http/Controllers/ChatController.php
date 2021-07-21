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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //投稿に対してチャットするためチャットボタン押下した投稿情報を取得        
        $post = Post::find($request->post_id);

        $id = $request->chat_start_user_id;
        //自分と相手のチャット情報取得
         $query = Chat::query();
         $chats = $query->where('send_user_id', $post['user_id'])->where('chat_start_user_id', $request->chat_start_user_id)
                        ->orWhere('send_user_id', intval($request->chat_start_user_id))->orderby('updated_at', 'desc')->get();
                          

        $chat_start_user_id = $request->chat_start_user_id;

        return view('chat', compact('post','chat_start_user_id', 'chats'));
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
        $chat['channel'] = 'chat-channel'.$post_user_id;
        $chat['chat_start_user_name'] = User::where('id', $chat['chat_start_user_id'])->value('name');//チャット通知したときに、チャットリンク作成で使用
        event(new PusherChat($chat));

        //DB登録成功でpusherへチャット送信イベント発火(チャットのやり取り専用のチャンネル、チャット通知用チャンネルの2チャンネル作成)
        $chat['channel'] = 'chat-channel'.$chat['post_id'].$chat['chat_start_user_id'];
        //使い終わったデータ削除
        unset($this->chat['post_id']);
        unset($this->chat['chat_start_user_id']);
        unset($this->chat['chat_start_user_name']);
        event(new PusherChat($chat));

        return response()->json();

    }
}
