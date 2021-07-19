$(function () {

    //全フォローリンクのクリックイベントを監視する
    $('.follow_btn').on('click', function(e) {
        e.preventDefault();

        //いいねされた投稿ID、ユーザID取得
        const followed_user_id = $(this).children('#followed_user_id').val();
        const user_id = $(this).children('#user_id').val();

        $.ajax({
            type: 'GET',
            url: '/follow', //web.phpのURLと同じ形にする
            data: {
                'followed_user_id': followed_user_id, //ここはサーバーに贈りたい情報。
                'user_id': user_id,
            },
            dataType: 'json', //json形式で受け取る
            timeout: 900000,
            beforeSend: function () {
            } 
        }).done(function(data){

            //同じユーザが複数件投稿してる可能性があるので、
            $('.follow_btn').each(function() {
                //今処理してる投稿のユーザID取得
                const post_user_id = $(this).children('#followed_user_id').val();

                //フォローリンクを押下したときの投稿のユーザIDと今ループで処理してる投稿のユーザIDが一致したらリンクの表示変更
                if(followed_user_id === post_user_id) {
                    //フォロー/フォロー解除完了後、サーバから来た情報で以下のようにする
                    //フォロー：リンクの文字は「フォロー解除」へ変更
                    //フォロー解除：リンクの文字を「フォローする」へ変更
                    if(data['isFollowed'] === true) {
                        $(this).children('.follow_link').text('フォロー解除');
                    }　else {
                        $(this).children('.follow_link').text('フォローする');
                    }
                }
            });

            if(data['isFollowed'] === true) {
                alert('フォローしました');
            }　else {
                alert('フォロー解除しました');
            }
           
        }).fail(function(){
            alert("通信に失敗しました");
        });
    });
});