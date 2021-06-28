<!-- 全投稿をループ -->
@foreach($posts as $post)
    <div id="tooltip_link_{{ $post->id }}" class="post" title="{{ __($post->title) }}">
        <!-- 編集完了したらホームに戻るよう引数で指定にする -->
        @component('components.postsDisplay', ['post' => $post,
                                               'URL'  => 'post/'.$post->id.'/edit' ])
        @endcomponent
    </div>
@endforeach