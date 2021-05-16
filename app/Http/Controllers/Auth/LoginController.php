<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    //5回ログインに失敗すると30分間ログイン不可にする(同一IP、同一ユーザをロック)
    protected $maxAttempts = 5;     // ログイン試行回数（回）
    protected $decayMinutes = 5;   // ログインロックタイム（分）

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * ユーザ名またはメールアドレスでログインできるようにするため、
     * トレイトのAuthenticatesUsersのメソッドをオーバーライド
     * リクエストから取得する名前指定の変更(デフォルトではメールのみ入る想定だが、idも入る可能性がある)
     */
    function username()
    {
        return 'email_or_name';
    }

    /**
     * ユーザ名またはメールアドレスでログインできるようにするため、
     * トレイトのAuthenticatesUsersのメソッドをオーバーライド
     * ログイン処理で、メールかユーザ名どちらが入力されたか判定してログイン項目を分ける
     * (判断として、メール形式ならメールでログインチェック、それ以外はユーザ名でログインチェックする)
     */
    function attemptLogin(\Illuminate\Http\Request $request)
    {
        $email_or_name = $request->input($this->username());
        $password = $request->input('password');

        if (filter_var($email_or_name, \FILTER_VALIDATE_EMAIL)) {
            $credentials = ['email' => $email_or_name, 'password' => $password];
        } else {
            $credentials = ['name' => $email_or_name, 'password' => $password];
        }
        return $this->guard()->attempt($credentials, $request->filled('remember'));
    }

    //ログインロックが正常に機能しない場合、以下追加()
    public function authorize(Request $request) {
        
        Log::debug('throttleKey -> '.print_r($this->throttleKey($request), 1));
        
        // プロキシサーバを経由した場合に、X-Forwarded-Forヘッダから接続元のクライアントIPを取得する設定
        $request::setTrustedProxies($request->ip(), $request::getTrustedHeaderSet());

    }
}
