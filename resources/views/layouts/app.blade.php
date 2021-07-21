<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ 'フットサルメンバー募集' }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://js.pusher.com/5.0/pusher.min.js"></script>
    <script>
        // モーダルウィンドウ
        $(window).on('load',function(){
            $('#myModal').modal('show');
        });

        //ツールチップ
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
          })
    </script>
    
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/app_additional_settings.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css">
</head>
<body>
    <!-- チャット通知で必要な情報 -->
    @guest
        <!-- 認証されてないとき処理なし -->
    @else
        <!-- ログイン時のみ、チャット通知でチャンネル作成のために今ログインしてる自分のユーザIDを定義 -->
        <input type="hidden" name='chat_my_user_id' id="chat_my_user_id" value="{{ Auth::user()->id }}">
        <!-- jsで動的にチャットリンクを作成するときに必要なチャットページのURL情報(phpのメソッドのためjs側で実行できない) -->
        <input type="hidden" name='chat_url' id="chat_url" value="{{ url('chat') }}">
        <!-- jsで動的にチャットリンクを作成するときに必要なトークン(@csrfはブレードテンプレートのためjs側で実行できない) -->
        <input type="hidden" name='chat_token' id="chat_token" value="{{ csrf_token() }}">
    @endguest
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                @if (session('flash_message'))
                    <!-- モーダルウィンドウの中身 -->
                    <div class="modal fade" id="myModal" tabindex="-1"
                        role="dialog" aria-labelledby="label1" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body text-center">
                                    {{ session('flash_message') }}
                                </div>
                                <div class="modal-footer text-center">
                                </div>
                            </div>
                        </div>
                    </div>
                 @endif

                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ 'フットサルメンバー募集' }}
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('ログイン') }}</a>
                            </li>
                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('登録') }}</a>
                                </li>
                            @endif
                        @else
                            <!-- 現在のURLがhomeのとき、キーワード検索を表示 -->
                            @if(strpos(url()->current(), 'home') !== false)
                                <form class="d-flex">
                                    <input id="search_bar" data-toggle="tooltip" data-html="true" data-trigger="manual" data-placement="bottom" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                                </form>
                            @endif

                            <li class="nav-item dropdown">
                                @if(Auth::user()->name )
                                    <a id="navbarDropdown" class="nav-link dropdown-toggle myPostName" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                        {{ Auth::user()->name }} <span class="caret"></span>
                                    </a>
                                @else
                                    <a id="navbarDropdown" class="nav-link dropdown-toggle myPostName" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                        {{ 'ゲスト' }} <span class="caret"></span>
                                    </a>
                                @endif
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ url('home') }}">
                                        {{ __('ホーム') }}
                                    </a>

                                    <a class="dropdown-item" href="{{ url('mypage') }}">
                                        {{ __('マイページ') }}
                                    </a>

                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('ログアウト') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>

                                    <!-- 退会が押下されたらdelete_account.jsでポップアップを表示しokが押下されたら退会フォームをsubmitメソッドで実行 -->
                                    <a class="dropdown-item delete_account" href="" onclick="event.preventDefault();">
                                        退会
                                    </a>

                                    <form id="delete_account-form" action="{{ url('deleteAccount') }}" method="post" style="display: none;">
                                        @csrf
                                        <input type="hidden" name='user_id' id="user_id" value="{{ Auth::user()->id }}">
                                        <button type="submit" name="add" style="display:none"></button>
                                    </form>
                                </div>
                            </li>
                            <!-- 退会 -->
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
    </div>
</body>
</html>
