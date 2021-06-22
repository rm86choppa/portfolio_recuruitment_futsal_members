<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApplicationInformationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('application_informations', function (Blueprint $table) {
            $table->Increments('id')->unsigned();

            //ユーザIDの外部キー設定
            //(参照してるユーザIDの登録が削除されたとき、そのIDを参照してるレコードも自動的に削除)
            $table->Integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            
            //投稿IDの外部キー設定
            //(参照してる投稿IDの登録が削除されたとき、そのIDを参照してるレコードも自動的に削除)
            $table->Integer('post_id')->unsigned();
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            
            //uniqueキー(1ユーザーにつき1投稿に1応募しかできないようユニーク制約設定)
            $table->unique(['user_id', 'post_id'], 'user_post_unique');

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
        Schema::dropIfExists('application_informations');
    }
}
