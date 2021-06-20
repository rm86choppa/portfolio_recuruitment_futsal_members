@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">

            <div class="card">
                <div class="card-body">
                    <label id="user_name_text" class="row col-md-4 col-form-label text-md-left name">{{ __(Auth::user()->name) }}</label>
                    <label class="row col-md-4 col-form-label text-md-left">{{ __(Auth::user()->email) }}</label>
                    <input type="hidden" name='user_id' id="login_user_id" value="{{ Auth::user()->id }}">
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="btn-group btn-group-lg w-100">
                        <a href="#" class="btn btn-primary border" id="user_name_change_button">{{ __('ユーザ名変更') }}</a>
                        <a href="#" class="btn btn-primary border">{{ __('メールアドレス変更') }}</a>
                        <a href="#" class="btn btn-primary border" id="password_change_button">{{ __('パスワード変更') }}</a>
                        <a href="/newPost" class="btn btn-primary border">{{ __('新規投稿') }}</a>
                    </div>
                </div>
            </div>

            <div class="text-right mt-3">
                <button type="submit" class="btn btn-primary switch_button col-md-2" onclick="document.getElementById('myPosts').style.visibility =hidden;">
                    {{ __('切替') }}
                </button>
            </div>


            <!-- 自分がいいねした投稿をループ(初期値は非表示にし、自分の投稿を表示して切替できるようにする) -->
            
            <p>自分のいいねした投稿</p>
            <div id="mylikedPosts" style="display: none;">
            @foreach($users as $user)
                <!-- ログインユーザの情報に紐づく投稿(自分がいいねしてる投稿)を表示 -->
                @if($user->id == Auth::user()->id)
                    <!-- ログインユーザの情報に紐づく投稿(自分がいいねしてる投稿)を表示 -->
                    @foreach($user->likes as $post)
                        <!-- 編集完了したらマイページに戻るよう引数で指定にする -->
                        @component('components.postsDisplay', ['post' => $post,
                                                               'URL'  => 'mypage/'.$post->id.'/edit' ])
                        @endcomponent
                    @endforeach
                @endif
            @endforeach
            </div>
            <p>自分のいいねした投稿end</p>

           
        <div id="myPosts">
            <!-- 全投稿をループ -->
            @foreach($posts as $post)
                <!-- ログイン中のユーザの投稿のみ表示 -->
                @if(Auth::user()->id == $post->user_id)
                @component('components.postsDisplay', ['post' => $post,
                                                       'URL'  => 'mypage/'.$post->id.'/edit' ])
                @endcomponent
                @endif
            @endforeach
        </div>
        </div>
    </div>
</div>
@endsection
