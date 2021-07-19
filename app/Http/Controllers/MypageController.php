<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\User;
use App\Tag;
use Illuminate\Support\Facades\Hash;
use App\Chat;
use Illuminate\Support\Facades\DB;

class MypageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //全投稿情報取得(投稿に紐づくユーザ、タグ、いいね情報も取得)
        $posts = Post::with('user', 'tags', 'likes', 'applications', 'chats')->orderBy('updated_at', 'desc')->get();

        //チャットを開始したユーザIDを取得するため全ユーザ取得
        $all_users = User::with('follows')->get();

        //ログインユーザがいいねした投稿の一覧を表示するため、ユーザに紐づく投稿(いいねした投稿)を取得
        $users = User::with('likes')->orderby('updated_at', 'desc')->get();

        return view('mypage', compact('posts', 'users', 'all_users'));
    }

    /**
     * ユーザネーム変更
     *
     * @return \Illuminate\Http\Response
     */
    public function nameChange(Request $request) {
        
        $user = User::find($request['user_id']);
        $user->name = $request['name'];
        $user->save();

        $ajax_return_data['name'] = $user->name;

        return response()->json($ajax_return_data);
    }

    /**
     * パスワード変更
     *
     * @return \Illuminate\Http\Response
     */
    public function passwordChange(Request $request) {
        
        $user = User::find($request['user_id']);

        //登録しようしてるパスワードと現在、登録中のパスワードを比較し同じであればエラーを入れてレスポンスを返す
        if(Hash::check($request['password'], $user->password)) {
            //同じ値だったとき、クライアントへエラーをレスポンス
            $ajax_return_data['error'] = "違う値で登録してください";

            return response()->json($ajax_return_data);
        } else {
            //パスワードを暗号化してからDBに保存
            $hashPass = Hash::make($request['password']);
            $user->password = $hashPass;
            $user->save();

            return response()->json();
        }

        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($postID)
    {
        $post = Post::find($postID);

        //タグ取得
        $tags_display_format = "";
        foreach ($post->tags as $tag) {
            $tags_display_format = $tags_display_format.'＃'.$tag->tag;
        }
        
        //編集画面での更新完了後の遷移先をマイページにするようURL情報を作成
        $URL = 'mypage/'.$postID;

        return view('editPost', compact('post', 'tags_display_format', 'URL'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $post_id)
    {
        $tag = new Tag;
        //タグを配列に変換
        $afterSplitTags = $tag->splitByTag($request->tag);

        //タグ登録
        $post_tag_datas = $tag->insertTagData($afterSplitTags);

        //投稿の更新
        $result = Post::find($post_id)->update(['title' => $request->title, 
                                                'recruitment_area' => $request->recruitment_area, 
                                                'recruitment_level' => $request->recruitment_level, 
                                                'practice_content' => $request->practice_content, 
                                                'schedule' => $request->schedule, 
                                                'recruitment_area_prefecture' => $request->recruitment_area_prefecture]);

        //中間テーブル更新
        $post =  Post::find($post_id);

        //新規登録
        $tags_display_format = "";
        if (isset($post_tag_datas)) {
            //更新し直しするため、syncを使用
            //(今まで紐づけされてた情報は不要で、リクエストでもらったタグ情報のみDBに保存される状態にする)
            $post->tags()->sync($post_tag_datas);

            $tags_display_format = $request->tag;
        }

        \Session::flash('flash_message', '更新が完了しました');

        return redirect('mypage');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
