@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">

            <!-- マイページのオプション機能(ユーザ名変更、パス変更、アドレス変更、切替(自身の投稿、いいねした投稿)) -->
            @component('components.mypageOption', ['name' => Auth::user()->name,
                                                   'email'  => Auth::user()->email ])
            @endcomponent


            <!-- 自分がいいねした投稿をループ(初期値は非表示にし、自分の投稿を表示して切替できるようにする) -->
            <div id="mylikedPosts" style="display: none;">
                <p class="text-primary">いいねした投稿</p>
                @foreach($users as $user)
                    <!-- ログインユーザの情報に紐づく投稿(自分がいいねしてる投稿)を表示 -->
                    @if($user->id == Auth::user()->id)
                        <!-- ログインユーザの情報に紐づく投稿(自分がいいねしてる投稿)を表示 -->
                        @foreach($user->likes as $post)
                            <!-- 編集完了したらマイページに戻るよう引数で指定にする -->
                            @component('components.postsDisplay', ['post' => $post,
                                                                   'URL'  => 'mypage/'.$post->id.'/edit', 
                                                                   'all_users' => $all_users])
                            @endcomponent
                        @endforeach
                    @endif
                @endforeach
            </div>
            <!-- 自分の投稿をループ -->
            <div id="myPosts">
                <p class="text-success">自分の投稿</p>
                <!-- 全投稿をループ -->
                @foreach($posts as $post)
                    <!-- ログイン中のユーザの投稿のみ表示 -->
                    @if(Auth::user()->id == $post->user_id)
                    @component('components.postsDisplay', ['post' => $post,
                                                           'URL'  => 'mypage/'.$post->id.'/edit', 
                                                           'all_users' => $all_users ])
                    @endcomponent
                    @endif
                @endforeach
            </div>
        </div>
    </div>
</div>
@endsection
