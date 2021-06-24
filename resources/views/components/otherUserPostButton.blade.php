<div class="btn-group w-25">

    <input type="hidden" name='post_id' id="application_post_id" value="{{ $post->id }}">
    <input type="hidden" name='user_id' id="application_user_id" value="{{ Auth::user()->id }}">

    @if($post->applications->where('id', Auth::user()->id)->count() >= 1)
        <button type="submit" class="btn btn-primary col-md-7 border application_button">
            {{ __('応募取消') }}
        </button>
    @else
        <button type="submit" class="btn btn-primary col-md-7 border application_button">
            {{ __('応募') }}
        </button>
    @endif
    <button type="submit" class="btn btn-primary col-md-7 border" onclick="document.getElementById('post_chat_form{{ $post->id }}').submit();">
        {{ __('チャット') }}
    </button>
    <!-- ボタンをform内に配置するとボタンが横並びしないため、
        表示上の削除ボタンが押下されたときonclickで隠れてるform内の削除ボタンのクリックイベントを発火する -->
    <form id="post_chat_form{{ $post->id }}" class="contents_Form" action="{{ url('post/'.$post->id) }}" method="post">
        @csrf
        @method('DELETE')
        <button type="submit" class="btn btn-primary col-md-7 border" style="display:none">
            {{ __('チャット') }}
        </button>
    </form>
</div>