@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6 mx-5">
            <div class="card">
                <div class="card-body">
                    <!-- ログイン行(SNSログイン、通常ログイン(メールとパス）) -->
                    <div class="row">
                        <!-- SNS連携 -->
                        <div class="col-md-4 offset-md-0"  role="group">
                            <button type="submit" class="btn btn-primary goole_button mb-2 w-100" onclick="location.href='/login/google'">
                                {{ __('Googleログイン') }}
                            </button>
                            <button type="submit" class="btn btn-primary facebook_button mb-2 w-100" onclick="location.href='/login/facebook'">
                                {{ __('Facebookログイン') }}
                            </button>
                            <button type="submit" class="btn btn-primary twitter_button mb-2 w-100" onclick="location.href='/login/twitter'">
                                {{ __('Twitterログイン') }}
                            </button>
                        </div>
                        <!-- SNS連携 -->
                        
                        <!-- 縦線 -->
                        <div class="v_line_fix"></div>

                        <div class="col"  role="group">
                            <form method="POST" action="{{ route('login') }}">
                                @csrf
                                <div class="form-group row">
                                    <input id="email_or_name" class="form-control @error('email_or_name') is-invalid @enderror" name="email_or_name" value="{{ old('email_or_name') }}" autocomplete="current-title" placeholder="ユーザ名またはメールアドレス">
                                    @error('email_or_name')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="form-group row">
                                    <input id="password" class="form-control @error('password') is-invalid @enderror" name="password" value="{{ old('password') }}" autocomplete="current-title" placeholder="パスワード">
                                    @error('password')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="form-group row">
                                    <button type="submit" class="btn btn-primary login_button">
                                        {{ __('ログイン') }}
                                    </button>
                                </div>
                        　  </form>
                        </div>
                    </div>
                    <!-- 横線 -->
                    <div class="s_line_fix col"></div>

                    <!-- ログイン行(SNSログイン、通常ログイン(メールとパス）) -->
                    <div class="form-group row mb-0">
                        <div class="col-md-10 offset-md-4">
                            <button type="submit" class="btn btn-primary sign_up_button" onclick="location.href='register'">
                                {{ __('仮登録') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
