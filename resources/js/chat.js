//チャットする投稿ID、ユーザID取得
const post_id = $('#chat_post_id').val();
const user_id = $('#chat_user_id').val();
const chat_start_user_id = $('#chat_start_user_id').val();

if(post_id === "" || user_id === "" || chat_start_user_id === "") {
  alert('このページで必要な情報が正常に取得できませんでした。ホームまたはマイページからやり直してください。')
} else {

  Pusher.logToConsole = true;
  //あとで、キーの指定を定数指定する
  var pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
      cluster: process.env.MIX_PUSHER_APP_CLUSTER,
      forceTLS: true
  });
  
  const channel = pusher.subscribe('chat-channel' + post_id + chat_start_user_id);
  //イベント名は、broadcastAsで省略された名前を指定(省略しない場合ネームスペースも含めた指定が必要)
  channel.bind('PusherChat', function(chat_obj_array) {

    //チャットデータが含まれているオブジェクト取得
    const chat = chat_obj_array.chat;
    
    //自分の投稿なら右に、相手の投稿なら左に表示れるよう要素追加
    if(chat.send_user_id === user_id) {

      const dom_str = '<div class="my_chat container mt-3 col-md-8 float-right">' +
                        '<p class="chat_content_text bg-success text-white rounded-pill  p-5"></p>' +
                        '<p class="date"></p>' +
                      '</div>';

      //チャット動的追加
      $(dom_str)
      .find('.chat_content_text').text(chat.chat_content).end()
      .find('.date').text(chat.updated_at).end()
      .prependTo('.chat_history');

    } else {
      const dom_str = '<div class="other_chat container mt-3 col-md-8 float-left">' +
                        '<p class="chat_content_text bg-primary text-white rounded-pill p-5"></p>' +
                        '<p class="date"></p>' +
                      '</div>';

      //チャット動的追加
      $(dom_str)
      .find('.chat_content_text').text(chat.chat_content).end()
      .find('.date').text(chat.updated_at).end()
      .prependTo('.chat_history');
    }

    //チャット送信完了後、テキストエリアの値は削除(同じ内容を何度も送る想定はないため)
    $('#chat_content').val('');
  });

  
  
  $('#chat_send_button').on('click', function(e) {
    e.preventDefault();

    
    const chat_content = $('#chat_content').val();

    if(chat_content === "") {
      alert('チャット内容が空です。送信内容を入力してから送信してください。')
    }else {
      $.ajax({
        type: 'GET',
        url: '/chat/send', //web.phpのURLと同じ形にする
        data: {
            'post_id': post_id, //ここはサーバーに贈りたい情報。
            'send_user_id': user_id,
            'chat_content': chat_content,
            /*ユニークなチャンネル名を作成して投稿ユーザとそのチャット相手のみでやり取りするため、
            投稿ユーザがチャットを送信した場合相手のユーザIDを使用してチャンネル名を作成するため使用
            (チャット送信したのが自分なら自分のユーザIDを入れる)*/ 
            'chat_start_user_id': chat_start_user_id, 
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
