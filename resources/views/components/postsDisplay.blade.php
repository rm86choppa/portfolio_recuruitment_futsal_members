<div class="card mt-3">
    <div class="card-header text-center">{{ __($post->title) }}</div>
    
    <div class="card-body">
        <label class="row col-md-12 col-form-label text-md-left name">{{ __($post->user->name) }}</label>
        <label class="row col-md-12 col-form-label text-md-left">{{ __($post->recruitment_area_prefecture) }} : {{ __($post->recruitment_area) }}</label>
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
        <div class="row justify-content-center">
            <div class="btn-group">
                    <button type="submit" class="btn btn-primary col-md-7 border" onclick="document.getElementById('post_edit_form{{ $post->id }}').submit();">
                        {{ __('編集') }}
                    </button>
                <form id="post_edit_form{{ $post->id }}" method="GET" action="{{ url('post/'.$post->id.'/edit') }}">
                    @csrf
                    <button type="submit" class="btn btn-primary col-md-7 border" style="display:none">
                        {{ __('編集') }}
                    </button>
                </form>
                <button type="submit" class="btn btn-danger col-md-7 border" onclick="document.getElementById('post_delete_form{{ $post->id }}').submit();">
                    {{ __('削除') }}
                </button>
                <!-- ボタンをform内に配置するとボタンが横並びしないため、
                    表示上の削除ボタンが押下されたときonclickで隠れてるform内の削除ボタンのクリックイベントを発火する -->
                <form id="post_delete_form{{ $post->id }}" class="contents_Form" action="{{ url('post/'.$post->id) }}" method="post">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger col-md-7 border" style="display:none">
                        {{ __('削除') }}
                    </button>
                </form>
            </div>
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
        </div>
    </div>
</div>