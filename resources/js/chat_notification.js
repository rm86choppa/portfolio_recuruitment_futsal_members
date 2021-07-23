var path = location.pathname || "";

//チャットページ「以外」のときチャット通知
if(path.includes('chat') === false) {
  const my_user_id = $('#chat_my_user_id').val() || "";//自分のID

  if(my_user_id === "") {
    //ログインしてないときチャンネル購読しない
  } else {

    //あとで、キーの指定を定数指定する
    var pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        forceTLS: true
    });

    //自分のユーザIDに来たすべてのチャットを通知するチャンネル作成(チャットイベント発火のとき、追加)
    const channel = pusher.subscribe('chat-channel' + my_user_id);
    //イベント名は、broadcastAsで省略された名前を指定(省略しない場合ネームスペースも含めた指定が必要)
    channel.bind('PusherChat', function(chat_obj_array) {

      //チャットデータが含まれているオブジェクト取得
      const chat = chat_obj_array.chat;
      
      //チャットを送った相手が自分の場合、通知をしない
      if(chat.my_user_id !== my_user_id) {
        
        //相手の投稿に対してのチャットだった場合、チャットボタンがあるので、チャットリンクは作成しなくてよい
        //(チャットチャンネルに付与されたIDを見て、自分のIDが含まれてれば相手の投稿になる)
        if(chat.chat_channel.includes(my_user_id) === false) {
          //チャットリンク作成に必要な情報取得
          const chat_url = $('#chat_url').val();
          const chat_token = $('#chat_token').val();

          //チャット情報は通知を送った相手を中心に作成(my_user_idは相手のIDになり、send_user_idは自分のIDになるので注意))
          const dom_str = `<a href="" onclick="event.preventDefault();` +
                          `document.getElementById('chat_form${ chat.post_id }${ chat.my_user_id }').submit();">${ chat.chat_start_user_name }</a>` +
                          `<div class="space">&nbsp;</div>` +
                          `<form id="chat_form${ chat.post_id }${ chat.my_user_id }" action="${ chat_url }" method="post" style="display: none;">` +
                            `<input type="hidden" name="_token" value="${ chat_token }"></input>` +
                            `<input type="hidden" name="send_user_id" id="send_user_id" value="${ chat.my_user_id }">` +
                            `<input type="hidden" name='my_user_id' id="my_user_id" value="${ my_user_id }">` +
                            `<input type="hidden" name="post_id" id="post_id" value="${ chat.post_id }">` +
                            `<input type="hidden" name='chat_channel' id="chat_channel" value="${ chat.chat_channel }">">` +
                            `<input type="hidden" name='notification_channel' id="notification_channel" value="${ chat.notification_channel }">` +
                            `<button id="chat_form_button" type="submit" name="add" style="display:none"></button>` +
                          `</form>`;

          //チャットが来た投稿での新規ユーザの時、チャットリンク動的追加
          const chat_links = $(`.chat_links${ chat.post_id }`);
          const chat_form = chat_links.find(`#chat_form${ chat.post_id }${ chat.my_user_id }`);
          const chat_user_form = chat_links.find(chat_form);
          if(chat_user_form.length === 0) {
            $(dom_str).insertAfter(`#chat_icon${ chat.post_id }`);
          }

          //チャットページに移動が選択されたとき、動的に作成したチャットリンクを使用してチャットページに移動
          let doMoveChatPage = false;   
          doMoveChatPage = window.confirm(`チャットが来ました。\nユーザ：${ chat.chat_start_user_name }\n内容：${ chat.chat_content }\nチャットページに移動しますか。`);
          
          if(doMoveChatPage == true) {
            document.getElementById(`chat_form${ chat.post_id }${ chat.my_user_id }`).submit();
          } 
        } else {
          //チャットページに移動が選択されたとき、動的に作成したチャットリンクを使用してチャットページに移動
          let doMoveChatPage = false;   
          doMoveChatPage = window.confirm(`チャットが来ました。\nユーザ：${ chat.chat_start_user_name }\n内容：${ chat.chat_content }\nチャットページに移動しますか。`);
          
          if(doMoveChatPage == true) {
            document.getElementById(`chat_form${ chat.post_id }${ chat.my_user_id }`).submit();
          } 
        }
      }
    });
  }
}


