<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\User;
use Illuminate\Support\Facades\Hash;

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
        //todo:いいね機能実装後、投稿に紐づくユーザ(いいねしたユーザ)の情報も取得が必要のためwithの引数に追加
        $posts = Post::with('user', 'tags')->orderBy('updated_at', 'desc')->get();

        return view('mypage', compact('posts'));
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

        //パスワードを暗号化してからDBに保存
        $hashPass = Hash::make($request['password']);
        $user->password = $hashPass;
        $user->save();

        return response()->json();
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
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
