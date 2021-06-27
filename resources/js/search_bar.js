$(function () {

  $('#search_bar').on('click', function() {
      $('#search_bar').tooltip('show');
  });
  //文字が入力されるたびに、投稿のタイトルと比較し、
  //入力文字列が含まれてる投稿情報を表示して投稿が選択されたらその投稿に移動する
  $('#search_bar').on('input', function() {
    $(this).css('background-color', '#ffc');
    const input = $(this).val();

    if(input != "") {
      //検索の文字列が含まれているタイトル要素のテキストを見つける
      const posts_array = $('.post');
          
      let result = false;
      let tooltip_title = "";
      $.each(posts_array, function(index, element) {
        const title = $(element).attr('title');
        const link = $(element).attr('id');

        result = title.indexOf(input) >= 0;
        if(result){
          tooltip_title = tooltip_title + '<a href=#'+ link + '>' + title + '</a>' + "<br>";
        }
        
      });

      //ツールチップに検索で一致した投稿のリンクを設定
      if(tooltip_title != "") {
        $('#search_bar').tooltip('dispose').tooltip({title: tooltip_title}).tooltip('show');
      } else {
        $('#search_bar').tooltip('dispose').tooltip({title: ""}).tooltip('show');
      }
    }
    
  });

  //フォーカスが外れたとき、
  $('#search_bar').on('blur', function() {
    $(this).css('background-color', '');
    $('#search_bar').tooltip('hide');
  });
});