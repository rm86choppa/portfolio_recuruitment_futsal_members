<div class="card">
    <div class="card-body">
        <div class="btn-group w-100">

            <button type="button" id="all_post_display_button" class="btn btn-primary home_option_button home_option_button_left">
                全て
            </button>

            <div class="dropdown">
                <button type="button" id="tag_button" class="btn btn-primary dropdown-toggle home_option_button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">タグ</button>
                <div class="dropdown-menu" id="tag_menu">
                    @foreach($tags as $tag)
                        <a class="dropdown-item dropdown-item_tag" href="#" data-value="{{ $tag->tag }}">{{ $tag->tag }}</a>
                    @endforeach
                </div>
            </div>

            <div class="dropdown">
                <button type="button" class="btn btn-primary dropdown-toggle home_option_button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">ユーザ</button>
                <div class="dropdown-menu" id="tag_menu">
                    @foreach($users as $user)
                        <a class="dropdown-item dropdown-item_user" href="#" data-value="{{ $user->name }}">{{ $user->name }}</a>
                    @endforeach
                </div>
            </div>

            <button type="button" class="btn btn-primary home_option_button">
                応募順
            </button>

            <button type="button" class="btn btn-primary home_option_button_right" onclick="location.href='/newPost'">
                新規投稿
            </button>
            

        </div>
    </div>
</div>