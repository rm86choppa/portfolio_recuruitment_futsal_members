$(function () {

    $('.dropdown-item_tag').on('click', function() {
        //絞り込みしたいタグの情報を取得
        const search_tag = "# " + $(this).attr("data-value");

        //投稿をループし、タブ部分が上記で選択したタグと一致すればその投稿を表示し、
        //一致しなければ非表示にする
        $('.post').each(function() {
            //タグ要素取得
            const tag_element = $(this).find(".tag");
            //タグ要素のテキスト取得
            const tag_text = tag_element.text();

            //検索対象のタグと一致したタグがあれば、その投稿は表示する
            if(tag_text && tag_text.includes(search_tag)){
                $(this).show();
            } else {
                $(this).hide();
            }
        });

    });
});