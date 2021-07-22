<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\User;

class ApplicationController extends Controller
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
     * 応募機能
     * 応募:中間テーブルにユーザID、投稿IDを含めてレコード追加
     * 応募解除:削除されたらレコード削除
     * 
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request) {
        $user_data = $request->all();

        //更新(応募済ならレコード削除、未応募ならレコード追加)
        $post = Post::find($request->post_id);

        //今対象の投稿にログインしてるユーザがいいねしてるかを検索(1投稿に同一ユーザは1いいねなので１か０が取得できる)
        $applications_count = $post->applications()->where('user_id', $request->user_id)->count();
        $ajax_return_data; 
        if($applications_count >= 1) {
            //レコード削除
            $post->applications()->detach($request->user_id);
            $ajax_return_data['isApplied'] = false;
        } else {
            //レコード追加
            $post->applications()->attach($request->user_id);
            $ajax_return_data['isApplied'] = true;
        }

        return response()->json($ajax_return_data);

    }
}
