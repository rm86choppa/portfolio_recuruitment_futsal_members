@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">

            <div class="card">
                <div class="card-body">
                    <label class="row col-md-4 col-form-label text-md-left">{{ __('ユーザ名') }}</label>
                    <label class="row col-md-4 col-form-label text-md-left">{{ __('abc@gmail.com') }}</label>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="btn-group btn-group-lg w-100">
                        <a href="#" class="btn btn-primary border">{{ __('ユーザ名変更') }}</a>
                        <a href="#" class="btn btn-primary border">{{ __('メールアドレス変更') }}</a>
                        <a href="#" class="btn btn-primary border">{{ __('パスワード変更') }}</a>
                        <a href="/newPost" class="btn btn-primary border">{{ __('新規投稿') }}</a>
                    </div>
                </div>
            </div>

            <div class="text-right mt-3">
                <button type="submit" class="btn btn-primary login_button col-md-2" onclick="location.href='#">
                    {{ __('切替') }}
                </button>
            </div>

            <!-- 全投稿をループ -->
            @foreach($posts as $post)
                <!-- ログイン中のユーザの投稿のみ表示 -->
                @if(Auth::user()->id == $post->user_id)
                    <div class="card mt-3">
                        <div class="card-header text-center">{{ __($post->title) }}</div>
                        
                        <div class="card-body">
                            <label class="row col-md-12 col-form-label text-md-left">{{ __($post->user->name) }}</label>
                            <label class="row col-md-12 col-form-label text-md-left">{{ __($post->recruitment_area_prefecture) }} {{ __($post->recruitment_area) }}</label>
                            <label class="row col-md-12 col-form-label text-md-left">{{ __($post->recruitment_level) }}</label>
                            <label class="row col-md-12 col-form-label text-md-left">{{ __($post->practice_content) }}</label>
                            <label class="row col-md-12 col-form-label text-md-left">{{ __($post->schedule) }}</label>
                            <!-- 1投稿に紐づく全タグ情報表示 -->
                            <div class="row col-md-12 ">
                            @isset($post->tags)
                                @foreach($post->tags as $tag)
                                    @isset($tag)
                                      <label class="text-md-left"><b>{{ __('#') }}</b> {{ __($tag->tag) }}</label>
                                    @endisset
                                @endforeach
                            @endisset
                            </div>
                            <div class="btn-group btn-group-lg w-100 justify-content-center">
                                <button type="submit" class="btn btn-primary login_button col-md-2 border" onclick="location.href='#">
                                    {{ __('切り替え') }}
                                </button>
                                <button type="submit" class="btn btn-primary login_button col-md-2 border" onclick="location.href='#">
                                    {{ __('切り替え') }}
                                </button>
                            </div>
                        </div>
                    </div>
                @endif
            @endforeach

        </div>
    </div>
</div>
@endsection
