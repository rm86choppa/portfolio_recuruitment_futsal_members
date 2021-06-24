<div class="btn-group">
    <button type="submit" class="btn btn-primary col-md-7 border" onclick="document.getElementById('post_edit_form{{ $post->id }}').submit();">
        {{ __('編集') }}
    </button>
    <!-- actionのURLは編集画面からの戻り先を受け取った変数を設定する -->
    <form id="post_edit_form{{ $post->id }}" method="GET" action="{{ url($URL) }}">
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