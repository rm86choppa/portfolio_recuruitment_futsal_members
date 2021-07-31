@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <!-- フォローユーザの投稿をループ(選択したフォローユーザの投稿一覧のみサーバから渡される) -->
            <div id="follow_user_posts">
                <p class="text-success">選択したフォローユーザの投稿</p>
                <!-- 全投稿をループ -->
                @foreach($posts as $post)
                    @component('components.postsDisplay', ['post' => $post,
                                                           'URL'  => 'mypage/'.$post->id.'/edit', 
                                                           'all_users' => $all_users ])
                    @endcomponent
                @endforeach
            </div>
        </div>
    </div>
</div>
@endsection
