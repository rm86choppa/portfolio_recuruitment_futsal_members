<div class="card">
    <div class="card-body">
        <label id="user_name_text" class="row col-md-4 col-form-label text-md-left myPostName">{{ __($name) }}</label>
        <label id="email_text" class="row col-md-4 col-form-label text-md-left">{{ __($email) }}</label>
        <!-- メールアドレス変更、ユーザ名変更で使用するユーザIDを追加 -->
        <input type="hidden" name='user_id' id="login_user_id" value="{{ Auth::user()->id }}">
    </div>
</div>

<div class="card">
    <div class="card-body">
        <div class="btn-group btn-group-lg w-100">
            <a href="#" class="btn btn-primary border" id="user_name_change_button">{{ __('ユーザ名変更') }}</a>
            <a href="#" class="btn btn-primary border" id="email_change_button">{{ __('メールアドレス変更') }}</a>
            <a href="#" class="btn btn-primary border" id="password_change_button">{{ __('パスワード変更') }}</a>
            <a href="/newPost" class="btn btn-primary border">{{ __('新規投稿') }}</a>
        </div>
    </div>
</div>

<div class="text-right mt-3">
    <button type="submit" class="btn btn-primary switch_button col-md-2">
        {{ __('切替') }}
    </button>
</div>
