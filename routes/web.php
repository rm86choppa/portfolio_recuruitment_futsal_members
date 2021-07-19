<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//SNS連携のルーティング
Route::get('login/{provider}',          'Auth\SocialAccountController@redirectToProvider');
Route::get('login/{provider}/callback', 'Auth\SocialAccountController@handleProviderCallback');

Route::get('/', function () {
    return view('auth.login');
});

Route::get('/newPost', function () {
    return view('newPost');
});

//仮登録(メール確認機能)を使用するため、"verify=true"に設定
Auth::routes(['verify' => true]);

Route::get('/home', 'HomeController@index')->name('home')->middleware('verified');

//退会機能のルート
Route::post('/deleteAccount', 'DeleteAccountController')->middleware('verified');

//Postコントローラへのルート(メール確認完了後に利用できるようverifiedのミドルウェア追加)
Route::resource('post', 'PostController', ['only' => ['index', 'create', 'store', 'edit', 'update', 'destroy']])->middleware('verified');

//mypage用ルート
Route::resource('mypage', 'MypageController', ['only' => ['index', 'create', 'store', 'edit', 'update', 'destroy']])->middleware('verified');

//いいね機能のルート
Route::get('/likes', 'LikesController')->middleware('verified');

//応募機能のルート
Route::get('/application', 'ApplicationController')->middleware('verified');

//ユーザネーム変更機能のルート
Route::get('/name_change', 'MypageController@nameChange')->middleware('verified');

//パスワード変更機能のルート
Route::get('/password_change', 'MypageController@passwordChange')->middleware('verified');

//並び替え機能のルート
Route::get('/home/sort', 'HomeController@sort')->middleware('verified');

//メールアドレス変更機能のルート
Route::get('/email', 'ChangeEmailController@sendChangeEmailLink')->middleware('verified');//メール送信
Route::get("reset/{token}", "ChangeEmailController@reset");//メール登録(メール内リンククリック後)

//チャット機能のルート
Route::post('/chat', 'ChatController@index')->middleware('verified');
Route::get('/chat/send', 'ChatController@chatSend')->middleware('verified');

//フォロー機能のルート
Route::get('/follow', 'FollowController@follow');//フォロー/フォロー解除処理
Route::post('/follow/post', 'FollowController@index');//フォロー者の投稿一覧ページ
