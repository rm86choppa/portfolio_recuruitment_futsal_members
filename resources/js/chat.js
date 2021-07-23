var path = location.pathname || "";

//チャットページのときのみチャット購読、送信機能を使用
if(path.includes('chat')) {

  //トークン取得
  const token = $('meta[name="csrf-token"]').attr('content');

  //ページを読み終わった後、最下部へ移動する処理実行
  $(function () {
    //まず、チャットが一番下が最新のため、最下部へ移動
    const element = document.documentElement;
    const bottom = element.scrollHeight - element.clientHeight;
    window.scroll(0, bottom);
  });

  //チャットする投稿ID、ユーザID取得
  const post_id = $('#chat_post_id').val() || "";
  const send_user_id = $('#send_user_id').val() || "";
  const my_user_id = $('#my_user_id').val() || "";
  const chat_channel = $('#chat_channel').val() || "";
  const notification_channel = $('#notification_channel').val() || "";

  if(post_id === "" || send_user_id === "" || my_user_id === "" || chat_channel === "" || notification_channel === "") {
    alert('このページで必要な情報が正常に取得できませんでした。ホームまたはマイページからやり直してください。')
  } else {

    //あとで、キーの指定を定数指定する
    var pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        forceTLS: true
    });
    
    const channel = pusher.subscribe(chat_channel);
    //イベント名は、broadcastAsで省略された名前を指定(省略しない場合ネームスペースも含めた指定が必要)
    channel.bind('PusherChat', function(chat_obj_array) {

      //チャットデータが含まれているオブジェクト取得
      const chat = chat_obj_array.chat;
      
      //自分の投稿(右に表示)
      if(chat.my_user_id === my_user_id) {

        const dom_str = '<div class="my_chat container mt-3 col-md-8 float-right">' +
                          '<p class="chat_content_text bg-success text-white rounded-pill  p-5"></p>' +
                          '<p class="date"></p>' +
                        '</div>';

        //チャット動的追加
        $(dom_str)
        .find('.chat_content_text').text(chat.chat_content).end()
        .find('.date').text(chat.updated_at).end()
        .appendTo('.chat_history');

        //自分の投稿のみチャット送信完了後、
        //テキストエリアの値は削除(同じ内容を何度も送る想定はないため)
        $('#chat_content').val('');
      }
      //相手の投稿(左に表示)
      else {
        const dom_str = '<div class="other_chat container mt-3 col-md-8 float-left">' +
                          '<p class="chat_content_text bg-primary text-white rounded-pill p-5"></p>' +
                          '<p class="date"></p>' +
                        '</div>';

        //チャット動的追加
        $(dom_str)
        .find('.chat_content_text').text(chat.chat_content).end()
        .find('.date').text(chat.updated_at).end()
        .appendTo('.chat_history');
      }

      //チャット更新時、チャットが一番下が最新のため、最下部へ移動
      const element = document.documentElement;
      const bottom = element.scrollHeight - element.clientHeight;
      window.scroll(0, bottom);
    });
    
    $('#chat_send_button').on('click', function(e) {
      e.preventDefault();

      const chat_content = $('#chat_content').val() || "";

      if(chat_content === "") {
        alert('チャット内容が空です。送信内容を入力してから送信してください。')
      }else {
        $.ajax({
          type: 'post',
          url: '/chat/send', //web.phpのURLと同じ形にする
          headers: {
            'X-CSRF-TOKEN': token,
          },
          data: {
              'post_id': post_id, //ここはサーバーに贈りたい情報。
              'send_user_id': send_user_id,
              'chat_content': chat_content,
              'my_user_id': my_user_id,
              'chat_channel': chat_channel, 
              'notification_channel': notification_channel, 
          },
          dataType: 'json', //json形式で受け取る
          timeout: 900000,
          beforeSend: function () {
          } 
        }).done(function(data){
          
        }).fail(function(){
            alert("通信に失敗しました");
        });
      }
    });
  }
}


