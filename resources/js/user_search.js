$(function () {

    $('.dropdown-item_user').on('click', function() {
        //絞り込みしたいタグの情報を取得
        const search_user = $(this).attr("data-value");
        //投稿をループし、タブ部分が上記で選択したタグと一致すればその投稿を表示し、
        //一致しなければ非表示にする
        $('.post').each(function() {
            //タグ要素取得
            const user_element = $(this).find(".search_user_name");
            //タグ要素のテキスト取得
            const user_text = user_element.text();

            //検索対象のタグと一致したタグがあれば、その投稿は表示する
            if(user_text && user_text.includes(search_user)){
                $(this).show();
            } else {
                $(this).hide();
            }
        });

    });
});