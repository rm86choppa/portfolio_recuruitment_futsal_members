@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-9">

            <!-- homeオプション(タグでの一覧、ユーザ毎の一覧、応募順) -->
            @component('components.homeOption', ['tags' => $tags,
                                                 'users' => $users])
            @endcomponent

            <!-- 全ての投稿を表示 -->
            <div id="allPosts">
                <p class="text-success">投稿一覧</p>
                <!-- 全投稿をループ -->
                @foreach($posts as $post)
                    <div class="post">
                        <!-- 編集完了したらホームに戻るよう引数で指定にする -->
                        @component('components.postsDisplay', ['post' => $post,
                                                            'URL'  => 'post/'.$post->id.'/edit' ])
                        @endcomponent
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
@endsection
