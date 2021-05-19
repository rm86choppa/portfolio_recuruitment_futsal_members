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

//仮登録(メール確認機能)を使用するため、"verify=true"に設定
Auth::routes(['verify' => true]);

Route::get('/home', 'HomeController@index')->name('home')->middleware('verified');

//Postコントローラへのルート(メール確認完了後に利用できるようverifiedのミドルウェア追加)
Route::resource('post', 'PostController', ['only' => ['index', 'create', 'store', 'edit', 'update', 'destroy']])->middleware('verified');