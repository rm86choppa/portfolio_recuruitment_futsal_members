$(function () {

    //応募ボタンのクリックイベントを監視する
    $('.application_button').each(function() {
        $(this).on('click', function() {

            const application_button = $(this);
            const applicationButtonText = $(this).text();

            let doApplication = false;
            if(applicationButtonText.includes('応募取消') === true) { 
                doApplication = window.confirm('応募取消してよろしいですか');
            } else {  
                doApplication = window.confirm('応募してよろしいですか');
            }

            if(doApplication == true) {
                //いいねされた投稿ID、ユーザID取得
                const post_id = $(this).parent().find('#application_post_id').val();
                const user_id = $(this).parent().find('#application_user_id').val();

                $.ajax({
                    type: 'GET',
                    url: '/application', //web.phpのURLと同じ形にする
                    data: {
                        'post_id': post_id, //ここはサーバーに贈りたい情報。
                        'user_id': user_id,
                    },
                    dataType: 'json', //json形式で受け取る
                    timeout: 900000,
                    beforeSend: function () {
                    } 
                }).done(function(data){

                    //応募済かどうかで応募ボタンのテキスト変更(未応募なら"応募"、応募済なら"応募取消"に文言修正する)
                    if(data['isApplied'] === true) {
                        alert("応募しました");
                        application_button.text("応募取消");
                    } else {
                        alert("応募取消しました");
                        application_button.text("応募");
                    }

                }).fail(function(){
                    alert("通信に失敗しました");
                });
            } else {
                //何もしない
            }
        });
    });
});