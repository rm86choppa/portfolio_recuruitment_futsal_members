<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\User;

class LikesController extends Controller
{
    /**
     * いいね機能
     * いいね:中間テーブルにユーザID、投稿IDを含めてレコード追加
     * いいね解除:削除されたらレコード削除
     * 
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request) {
        $user_data = $request->all();

        //更新(いいね済ならレコード削除、未いいねならレコード追加)
        $post = Post::find($request->post_id);

        //今対象の投稿にログインしてるユーザがいいねしてるかを検索(1投稿に同一ユーザは1いいねなので１か０が取得できる)
        $likes_count = $post->likes()->where('user_id', $request->user_id)->count();
        $ajax_return_data; 
        if($likes_count >= 1) {
            $post->likes()->detach($request->user_id);
            $ajax_return_data['isLiked'] = false;
        } else {
            $post->likes()->attach($request->user_id);
            $ajax_return_data['isLiked'] = true;
        }
    
        //今、いいねされた投稿のいいね数を数えてajaxのリターン変数に格納
        $ajax_return_data['liked_count'] = $post->likes()->count();

        return response()->json($ajax_return_data);

    }
}
