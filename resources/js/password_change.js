$(function () {

    $('#password_change_button').on('click', function() {

        //入力した変更後のnameを取得
        const password_after_change = window.prompt("新しいパスワードを入力してください");
        //更新対象のユーザを検索するためユーザIDを取得
        const user_id = $('.likes_btn').children('#user_id').val();

        //ユーザ名が入力されてない(空文字)かキャンセル押下(null)してないとき、変更開始
        if(password_after_change != null && password_after_change != "") {
            $.ajax({
                type: 'get',
                url: '/password_change', //web.phpのURLと同じ形にする
                data: {
                    'password': password_after_change, //ここはサーバーに贈りたい情報。
                    'user_id': user_id,
                },
                dataType: 'json', //json形式で受け取る
                timeout: 900000,
                beforeSend: function () {
                } 
            }).done(function(data){
            
                alert('パスワードを変更しました');

            }).fail(function(){
                alert("通信に失敗しました");
            });
        }
    });
});