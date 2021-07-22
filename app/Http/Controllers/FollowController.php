<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Post;

class FollowController extends Controller
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
        $follow_user = $request->all();

        //選択したフォローユーザの投稿を取得
        $posts = Post::with('user', 'tags', 'likes', 'applications', 'chats')
                       ->where('user_id', $follow_user['post_display_user_id'])->orderBy('updated_at', 'desc')->get();

        //チャットを開始したユーザIDを取得するため全ユーザ取得
        $all_users = User::with('follows')->get();

        //ログインユーザがいいねした投稿の一覧を表示するため、ユーザに紐づく投稿(いいねした投稿)を取得
        $users = User::with('likes')->orderby('updated_at', 'desc')->get();

        return view('follow_user_posts', compact('posts', 'users', 'all_users'));
    }

    public function follow(Request $request) {
        $user_data = $request->all();

        //中間テーブルに今回対象の相手ユーザIDがあればフォロー済のため、フォロー解除(レコード削除)しなければフォローする(レコード追加)
        $my_user = User::with('follows')->where('id', $user_data['user_id'])->first(); 

        $followed_users = $my_user->follows;
        $othre_user = $followed_users->where('id', $user_data['followed_user_id'])->first();//自分がフォローしてる情報の中に対象のIDがあるか検索

        //対象のユーザ情報が中間テーブルにあればレコード削除、なければレコード追加する
        if(isset($othre_user)){
            $my_user->follows()->detach($request->followed_user_id);
            $ajax_return_data['isFollowed'] = false;
        } else {
            $my_user->follows()->attach($request->followed_user_id);
            $ajax_return_data['isFollowed'] = true;
        }

        return response()->json($ajax_return_data);
    }
}
