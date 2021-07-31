<div class="card">
    <div class="card-body">
        <label id="user_name_text" class="row col-md-4 col-form-label text-md-left myPostName">{{ __($name) }}</label>
        <label id="email_text" class="row col-md-4 col-form-label text-md-left">{{ __($email) }}</label>
        <!-- メールアドレス変更、ユーザ名変更で使用するユーザIDを追加 -->
        <input type="hidden" name='user_id' id="login_user_id" value="{{ Auth::user()->id }}">
        <!-- フォロー一覧 -->
        @php
            $my_user = $all_users->where('id', Auth::user()->id)->first();
            $follow_users = $my_user->follows; 
        @endphp
        <?php echo('フォロー一覧：'); ?>
        @foreach($follow_users as $follow_user)
            <a href="" onclick="event.preventDefault();
                                                    document.getElementById('follow_post_form').submit();">{{ $follow_user->name }}</a>
            <div class="space">&nbsp;</div>
            <form id="follow_post_form" action="{{ url('follow/post') }}" method="post" style="display: none;">
                @csrf
                <input type="hidden" name='post_display_user_id' id="post_display_user_id" value="{{ $follow_user->id }}">
                <button id="follow_post_button" type="submit" name="add" style="display:none"></button>
            </form>
        @endforeach
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
