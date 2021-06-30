$(function () {

    $('#email_change_button').on('click', function() {

        //今のメールアドレスを取得
        const email = $('#email_text').text();

        //入力した変更後のメールアドレスを取得
        const email_after_change = window.prompt("新しいメールアドレスを入力してください", email);

        //メールアドレスが入力されてない(空文字)かキャンセル押下(null)してないとき、変更開始
        if(email_after_change == null || email_after_change == "" ) {
            //何もしない
        } else if(email_after_change == email) {
            alert("違う値で入力してください");
        } else {
            //更新対象のユーザを検索するためユーザIDを取得
            const user_id = $('#login_user_id').val();
            
            $.ajax({
                type: 'get',
                url: '/email', //web.phpのURLと同じ形にする
                data: {
                    'new_email': email_after_change, //ここはサーバーに贈りたい情報。
                    'user_id': user_id,
                },
                dataType: 'json', //json形式で受け取る
                timeout: 900000,
                beforeSend: function () {
                } 
            }).done(function(data){
                
                if(data['message'] !== 'undefined') {
                    alert(data['message']);
                }

            }).fail(function(){
                alert("通信に失敗しました");
            });
        }
    });
});