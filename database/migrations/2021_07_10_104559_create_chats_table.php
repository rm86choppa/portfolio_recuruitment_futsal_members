<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chats', function (Blueprint $table) {
            $table->Increments('id')->unsigned();

            //チャットを送ったユーザIDの外部キー設定
            //(参照してるユーザIDの登録が削除されたとき、そのIDを参照してるレコードも自動的に削除)
            $table->Integer('send_user_id')->unsigned();
            $table->foreign('send_user_id')->references('id')->on('users')->onDelete('cascade');
            
            //チャットを開始したユーザIDの外部キー設定
            //(参照してるユーザIDの登録が削除されたとき、そのIDを参照してるレコードも自動的に削除)
            $table->Integer('chat_start_user_id')->unsigned();
            $table->foreign('chat_start_user_id')->references('id')->on('users')->onDelete('cascade');

            //投稿IDの外部キー設定
            //(参照してる投稿IDの登録が削除されたとき、そのIDを参照してるレコードも自動的に削除)
            $table->Integer('post_id')->unsigned();
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');

            //チャット内容(文字数制限は多めに設定)
            $table->string('chat_content', 10000);

            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chats');
    }
}
