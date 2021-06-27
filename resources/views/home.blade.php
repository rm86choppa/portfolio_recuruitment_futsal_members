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
            <p class="text-success">投稿一覧</p>
            <div id="allPosts">
                @component('components.postsDisplayCallFromHome', ['posts' => $posts])
                @endcomponent
            </div>
        </div>
    </div>
</div>
@endsection
