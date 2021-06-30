<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmailResetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('email_resets', function (Blueprint $table) {
            $table->Increments('id')->unsigned();
            
            //ユーザIDの外部キー設定
            //(参照してるユーザIDの登録が削除されたとき、そのIDを参照してるレコードも自動的に削除)
            $table->Integer('user_id')->unsigned()->comment('メールアドレスを更新したユーザーID');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->string('new_email')->comment('ユーザーが新規に設定したメールアドレス');
            $table->string('token')->comment('ユーザーが新規に設定したメールアドレス');
            
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
        Schema::dropIfExists('email_resets');
    }
}
