<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PusherChat implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $chat;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($chat)
    {
        $this->chat = $chat;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        //チャンネル名に、投稿IDとチャットを申請したユーザIDを付与(投稿ユーザとチャットを申請したユーザで1対1でのやり取りを想定)
        $channel = 'chat-channel'.$this->chat['post_id'].$this->chat['chat_start_user_id'];
        //使い終わったデータ削除
        unset($this->chat['post_id']);
        unset($this->chat['chat_start_user_id']);

        return new Channel($channel, $this->chat);
        //認可を受けないといけない
        //return new Channel('private-chat-channel', $this->chat);
    }

    /**
     * イベントブロードキャスト名
     *
     * @return string
     */
    public function broadcastAs()
    {
 
        return 'PusherChat';
    }
}
