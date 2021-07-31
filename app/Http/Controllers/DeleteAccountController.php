<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;

class DeleteAccountController extends Controller
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
     * 退会機能
     * 退会を選択したユーザのidを受け取り、ユーザ情報削除
     * 
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request) {
        $user_data = $request->all();
        $id = $user_data['user_id'];

        User::find($id)->delete();

        Auth::logout();

        return view('delete_account_complete');

    }
}
