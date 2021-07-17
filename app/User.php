<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Social;


class User extends Authenticatable implements MustVerifyEmail
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    //postsとの紐づけ(リレーション)
    //主テーブル名の単数_id(user_id)にしてる場合は特に必要ないが、それ以外の場合外部キー、ローカルキーを指定が必要
    public function posts() {
        return $this->hasMany('App\Post');
    }

    //SNS連携のリレーション
    public function accounts() {
        return $this->hasMany('App\Social', 'user_id', 'id');
    }

    //いいね機能のリレーション(postsと多対多の紐づけ)
    public function likes() {
        return $this->belongsToMany('App\Post', 'likes')->withTimestamps();
    }

    //応募機能のリレーション
    public function applications() {
        return $this->belongsToMany('App\Post', 'application_informations')->withTimestamps();
    }

    //チャット機能のリレーション
    public function chats() {
        return $this->belongsToMany('App\User', 'chats', 'send_user_id', 'post_id')->withTimestamps();
    }
}
