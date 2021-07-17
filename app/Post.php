<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    
    protected $guarded = array('id');

    //usersとの紐づけ(リレーション)
    //主テーブル名の単数_id(post_id)にしてる場合は特に必要ないが、それ以外の場合外部キー、ローカルキーを指定が必要
    public function user() {
        return $this->belongsto('App\User');
    }

    //タグ機能で多対多のリレーションを組んで中間テーブルを使用するためtagsと紐づけ
    public function tags() {
        return $this->belongsToMany('App\Tag')->withTimestamps();
    }

    //いいね機能のリレーション(usersと多対多の紐づけ)
    public function likes() {
       return $this->belongsToMany('App\User', 'likes')->withTimestamps();
    }

    //応募機能のリレーション
    public function applications() {
        return $this->belongsToMany('App\User', 'application_informations')->withTimestamps();
    }

    //チャット機能のリレーション(一投稿に対して、チャットしたユーザを複数人重複を排除して取得するため一対多でのリレーション)
    public function chats() {
        return $this->hasMany('App\Chat');
    }

}
