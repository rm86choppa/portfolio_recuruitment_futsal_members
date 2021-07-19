<div class="card mt-3">
    <div class="card-header text-center tooltip_title">{{ __($post->title) }}</div>
    
    <div class="card-body">
        <!-- 今処理してる投稿が自分の投稿なら自分の投稿だとわかるようクラス名をつける(ユーザ名変更で使用するクラス名) -->
        @if($post->user_id == Auth::user()->id)
            <label class="row col-md-12 col-form-label text-md-left myPostName search_user_name">{{ __($post->user->name) }}</label>
        @else
            <label class="row col-md-12 col-form-label text-md-left otherUserName search_user_name">{{ __($post->user->name) }}</label>
        @endif
        <label class="row col-md-12 col-form-label text-md-left">{{ __($post->recruitment_area_prefecture) }} : {{ __($post->recruitment_area) }}</label>
        <label class="row col-md-12 col-form-label text-md-left">{{ __($post->recruitment_level) }}</label>
        <label class="row col-md-12 col-form-label text-md-left">{{ __($post->practice_content) }}</label>
        <label class="row col-md-12 col-form-label text-md-left">{{ __($post->schedule) }}</label>
        @isset($post->applications_count)
            <label class="row col-md-12 col-form-label text-md-left"><span>応募数：</span>{{ __($post->applications_count) }}</label>
        @endisset
        <!-- 自分の投稿のみ1投稿に紐づくチャットしたユーザ表示 -->
        @if($post->user_id == Auth::user()->id)
            <div class="row col-md-12 ">
                @if($post->chats->whereNotIn('send_user_id', Auth::user()->id)->groupBy('send_user_id')->count() >= 1)
                    <?php $chats = $post->chats->whereNotIn('send_user_id', Auth::user()->id)->groupBy('send_user_id'); ?>
                    <?php echo('チャットユーザ：'); ?>
                        @foreach($chats as $chat_send_user)
                            @php
                                $chat_user_data = $all_users->where('id', $chat_send_user[0]->send_user_id)->first(); 
                            @endphp
                            @isset($chat_user_data)
                                <a href="" onclick="event.preventDefault();
                                                    document.getElementById('chat_form').submit();">{{ $chat_user_data->name }}</a>
                                <div class="space">&nbsp;</div>
                                <form id="chat_form" action="{{ url('chat') }}" method="post" style="display: none;">
                                    @csrf
                                    <input type="hidden" name='chat_start_user_id' id="chat_start_user_id" value="{{ $chat_user_data->id }}">
                                    <input type="hidden" name='post_id' id="post_id" value="{{ $post->id }}">
                                    <button id="chat_form_button" type="submit" name="add" style="display:none"></button>
                                </form>
                            @endisset
                        @endforeach
                @endif
            </div>
        @endif
        <!-- 1投稿に紐づく全タグ情報表示 -->
        <div class="row col-md-12 ">
        @isset($post->tags)
            @foreach($post->tags as $tag)
                @isset($tag)
                  <label class="text-md-left tag"><b>{{ __('#') }}</b> {{ __($tag->tag) }}</label>
                @endisset
            @endforeach
        @endisset
        </div>
        <div class="row justify-content-center">
            <!-- 自分の投稿のときは、編集削除ボタン、他のユーザの投稿のときは応募、チャットボタンを設定 -->
            @if($post->user_id == Auth::user()->id)
                @component('components.myPostButton', ['post' => $post,
                                                       'URL'  => $URL ])
                @endcomponent
            @else
                @component('components.otherUserPostButton', ['post' => $post,
                                                              'URL'  => $URL ])
                @endcomponent
            @endif
            <div class="btn btn-link likes_btn">
                <input type="hidden" name='post_id' id="post_id" value="{{ $post->id }}">
                <input type="hidden" name='user_id' id="user_id" value="{{ Auth::user()->id }}">
                <!-- 今処理してる投稿に自分がいいねしてるか調べていいね済アイコンか未いいねアイコンのどちらを表示するか判定 -->
                <!-- 方法：今ループで処理してる投稿に紐づいてるいいねの中で自分(ログインユーザ)のidと一致してるレコードがあるか条件で検索 -->
                @if($post->likes->where('id', Auth::user()->id)->count() >= 1)
                    <i class="far fa-heart hide">{{ $post->likes->count() }}</i>
                    <i class="fas fa-heart">{{ $post->likes->count() }}</i>
                @else
                    <i class="far fa-heart">{{ $post->likes->count() }}</i>
                    <i class="fas fa-heart hide">{{ $post->likes->count() }}</i>
                @endif
            </div>
            <!-- フォローリンク(相手の投稿のときのみ表示) -->
            @if($post->user_id !== Auth::user()->id)
                <div class="btn btn-link follow_btn">
                    <input type="hidden" name='followed_user_id' id="followed_user_id" value="{{ $post->user_id }}">
                    <input type="hidden" name='user_id' id="user_id" value="{{ Auth::user()->id }}">
                    
                    <!-- 今、処理してる投稿の投稿ユーザに対してフォローしていたら「フォロー解除」、未フォローなら「フォローする」と表示 -->
                    @php
                        $my_user = $all_users->where('id', Auth::user()->id)->first();
                        
                        $followed_user = $my_user->follows->where('id', $post->user_id)->first();
                    @endphp
                    @isset($followed_user)
                        <a class="follow_link" href="{{ url('/follow') }}">{{ 'フォロー解除' }}</a>   
                    @else
                        <a class="follow_link" href="{{ url('/follow') }}">{{ 'フォローする' }}</a> 
                    @endisset
                </div>
            @endif
        </div>
    </div>
</div>