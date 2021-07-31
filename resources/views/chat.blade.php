@extends('layouts.app')

@section('content')
<!-- チャット送信する際のDBへの保存情報 -->
<input type="hidden" name='post_id' id="chat_post_id" value="{{ $post->id }}">
<input type="hidden" name='my_user_id' id="my_user_id" value="{{ Auth::user()->id }}">
<!-- チャットする際のチャンネル作成で必要なチャットを送信した相手ユーザID(チャット開始したユーザが自分じゃないときもあるので注意。
    チャットをするのにユニークなチャンネル名にしてほかのユーザにも通知されたりしないため必要) -->
<input type="hidden" name='send_user_id' id="send_user_id" value="{{ $send_user_id }}">
<input type="hidden" name='notification_channel' id="notification_channel" value="{{ $notification_channel }}">
<input type="hidden" name='chat_channel' id="chat_channel" value="{{ $chat_channel }}">

<div class="container">
    <div class="row justify-content-center">
        <div class="chat_history col-md-10">
            @foreach($chats as $chat)
                <!-- 今処理してるチャット情報が、自分のチャットなら右側に、相手の投稿なら左側に表示 -->
                @if($chat->my_user_id == Auth::user()->id)
                    <!-- 自分の投稿(右側表示) -->
                    <div class="my_chat container mt-3 col-md-8 float-right">
                        <p class="chat_content_text bg-success text-white rounded-pill  p-5">{{ $chat->chat_content }}</p>
                        <p class="date">{{ $chat->updated_at }}</p>
                    </div>
                @else
                    <!-- 相手の投稿(左側表示) -->
                    <div class="other_chat container mt-3 col-md-8 float-left">
                        <p class="chat_content_text bg-primary text-white rounded-pill p-5">{{ $chat->chat_content }}</p>
                        <p class="date">{{ $chat->updated_at }}</p>
                    </div>
                @endif
            @endforeach
        </div>
        <div class="fixed-bottom col-md-12 bg-white shadow-sm text-center">
            <div class= "col-md-12">
                <textarea id="chat_content" name="chat_content" class="col-md-7 align-bottom" cols="40" rows="3" placeholder="チャット内容">{{ old('chat-content') }}</textarea>
                <button id="chat_send_button" type="submit" class="btn btn-primary">
                    {{ __('送信') }}
                </button>
            </div>
            
        </div>
    </div>
</div>
@endsection
