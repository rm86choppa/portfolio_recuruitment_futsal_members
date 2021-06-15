@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <form method="post" action="{{ url('post/'.$post['id']) }}">
                        @csrf
                        @method('PUT')
                        <div class="form-group row">
                            <label for="title" class="col-md-4 col-form-label text-md-right">{{ __('タイトル') }}</label>

                            <div class="col-md-6">
                                <input id="title" class="form-control @error('title') is-invalid @enderror" name="title" autocomplete="current-title" value="{{ $post['title'] }}" placeholder="フットサルメンバー募集">

                                @error('title')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="recruitment_area" class="col-md-4 col-form-label text-md-right">{{ __('募集地域') }}</label>

                            <div class="col-md-6">
                                @component('components.prefecture',['recruitment_area_prefecture', $post->recruitment_area_prefecture])
                                @endcomponent

                                <input id="recruitment_area" class="form-control @error('recruitment_area') is-invalid @enderror" name="recruitment_area" autocomplete="current-area" value="{{ $post['recruitment_area'] }}"　placeholder="足立区、新宿区">

                                @error('recruitment_area')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
 
                        <div class="form-group row">
                            <label for="recruitment_level" class="col-md-4 col-form-label text-md-right">{{ __('レベル') }}</label>

                            <div class="col-md-6">
                                <select name="recruitment_level">
                                    <option value="初心者" selected　@if($post['recruitment_level']=='初心者') selected  @endif>初心者</option>
                                    <option value="中級車" @if($post['recruitment_level']=='中級車') selected  @endif>中級車</option>
                                    <option value="上級者" @if($post['recruitment_level']=='上級者') selected  @endif>上級者</option>
                                </select>

                                @error('recruitment_level')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="practice_content" class="col-md-4 col-form-label text-md-right">{{ __('練習内容') }}</label>

                            <div class="col-md-6">
                                <input id="practice_content" class="form-control @error('practice_content') is-invalid @enderror" name="practice_content" autocomplete="current-practice_content" value="{{ $post['practice_content'] }}" placeholder="基礎練習、パス練習、ミニゲーム">

                                @error('practice_content')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="schedule" class="col-md-4 col-form-label text-md-right">{{ __('予定') }}</label>

                            <div class="col-md-6">
                                <input id="schedule" class="form-control @error('schedule') is-invalid @enderror" name="schedule" autocomplete="current-schedule"   value="{{ $post['schedule'] }}" placeholder="<?php echo date("Y年m月n日H時～");?> 〇〇フットサル場">

                                @error('schedule')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="tag" class="col-md-4 col-form-label text-md-right">{{ __('タグ(「＃」区切り)') }}</label>

                            <div class="col-md-6">
                                <textarea id="tag" class="form-control @error('tag') is-invalid @enderror" name="tag" autocomplete="current-tag" cols="40" rows="8" placeholder=@if(!isset($tags_display_format))"＃初心者歓迎＃男女どちらでも"@endif>{{ $tags_display_format }}</textarea>
                                @error('tag')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>

                            <input type="hidden" name='user_id' class="user_id" value="{{ Auth::user()->id }}">
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('更新') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
