<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;

class DeleteAccountController extends Controller
{
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
