$(function () {
    //退会リンクが押下
    $('.delete_account').on('click', function() {
        //ダイアログがクリックされたら退会form実行
        const canDeleteAccount = window.confirm('退会してよろしいですか');

        if (canDeleteAccount == true) {
            const delete_account_form = document.getElementById('delete_account-form');
            delete_account_form.submit();
        } else {
            //何もしない
        }
    });
});