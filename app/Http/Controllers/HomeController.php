<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\User;
use App\Tag;
use App\Chat;

class HomeController extends Controller
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
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        //全投稿情報取得(投稿に紐づくユーザ、タグ、いいね情報も取得)
        $posts = Post::with('user', 'tags', 'likes', 'applications', 'chats')->orderBy('updated_at', 'desc')->get();

        //ユーザの投稿一覧を表示する情報取得
        $users = User::with('posts')->orderby('updated_at', 'desc')->get();

        //タグを選択し、選択したタグに紐づく投稿を取得する
        $tags = Tag::with('posts')->orderby('updated_at', 'desc')->get();

        //チャットを開始したユーザIDを取得するため全ユーザ取得
        $all_users = User::with('follows')->get();

        return view('home', compact('posts', 'users', 'tags', 'all_users'));
    }

    /**
     * sorttypeを受け取り、typeに応じた並べ替え後の投稿view部分を返す
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function sort() {

        //全投稿情報取得(投稿に紐づくユーザ、タグ、いいね情報も取得)
        $posts = Post::with('user', 'tags', 'likes', 'applications', 'chats')->withcount('applications')->orderBy('applications_count', 'desc')->get();

        //ユーザの投稿一覧を表示する情報取得
        $users = User::with('posts')->orderby('updated_at', 'desc')->get();

        //タグを選択し、選択したタグに紐づく投稿を取得する
        $tags = Tag::with('posts')->orderby('updated_at', 'desc')->get();

        //チャットを開始したユーザIDを取得するため全ユーザ取得
        $all_users = User::with('follows')->get();
        
        return view('home', compact('posts', 'users', 'tags', 'all_users'));
    }
}
