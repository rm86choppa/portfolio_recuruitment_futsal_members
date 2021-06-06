@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <form method="post" action="{{ url('post') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="title" class="col-md-4 col-form-label text-md-right">{{ __('タイトル') }}</label>

                            <div class="col-md-6">
                                <input id="title" class="form-control @error('title') is-invalid @enderror" name="title" autocomplete="current-title" value="{{ old('title') }}">

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
                                <input id="recruitment_area" class="form-control @error('recruitment_area') is-invalid @enderror" name="recruitment_area" autocomplete="current-area" value="{{ old('recruitment_area') }}">

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
                                <input id="recruitment_level" class="form-control @error('recruitment_level') is-invalid @enderror" name="recruitment_level" autocomplete="current-level" value="{{ old('recruitment_level') }}">

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
                                <input id="practice_content" class="form-control @error('practice_content') is-invalid @enderror" name="practice_content" autocomplete="current-practice_content" value="{{ old('practice_content') }}">

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
                                <input id="schedule" class="form-control @error('schedule') is-invalid @enderror" name="schedule" autocomplete="current-schedule"   value="{{ old('schedule') }}">

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
                                <textarea id="tag" class="form-control @error('tag') is-invalid @enderror" name="tag" autocomplete="current-tag" cols="40" rows="8">{{ old('tag') }}</textarea>
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
                                    {{ __('新規登録') }}
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
