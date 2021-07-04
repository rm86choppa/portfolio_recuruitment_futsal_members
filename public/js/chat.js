$(function () {

  window.Echo.channel("chat-channel").listen("PusherChat", (e) => {
    alert(e);
  });
/*
  window.Echo.private("chat-channel").listen("PusherChat", e => {
    alert(e);
  });*/

  
  $('#chat_link').on('click', function(e) {
    e.preventDefault();

    $.ajax({
      type: 'GET',
      url: '/chat/send', //web.phpのURLと同じ形にする
      data: {
          //'post_id': post_id, //ここはサーバーに贈りたい情報。
          //'user_id': user_id,
      },
      dataType: 'json', //json形式で受け取る
      timeout: 900000,
      beforeSend: function () {
      } 
    }).done(function(data){

      
    }).fail(function(){
        alert("通信に失敗しました");
    });
  });

});