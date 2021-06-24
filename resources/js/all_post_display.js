$(function () {

    $('#all_post_display_button').on('click', function() {
        $('.post').each(function() {
            $(this).show();
        });

    });
});