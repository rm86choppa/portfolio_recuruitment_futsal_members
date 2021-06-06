@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>
                <button type="submit" class="btn btn-primary login_button" onclick="location.href='/newPost'">
                    {{ __('新規投稿') }}
                </button>
                <div class="card-body">
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
                                    <button type="submit" class="btn btn-primary login_button" onclick="location.href='/'">
                                        {{ __('') }}
                                    </button>
                                </div>
                        　  </form>
                        </div>
                    </div>


                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    マイページ画面作成予定
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
