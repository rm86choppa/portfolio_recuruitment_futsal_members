<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    
    protected $guarded = array('id');

    public function splitByTag($beforeSplitTag) {
        

        //タグをハッシュタグ毎に分ける
        if (isset($beforeSplitTag)){

            $convertTagDatas = explode("＃", $beforeSplitTag);
            //最初のハッシュタグまでで1つの配列を作成してしまうので、空の要素は削除
            if ($convertTagDatas[0] == "") {
                unset($convertTagDatas[0]);
            }

            //重複削除
            return array_unique($convertTagDatas);
        }

        return;

    }

    //usersとの紐づけ(リレーション)
    //主テーブル名の単数_id(post_id)にしてる場合は特に必要ないが、それ以外の場合外部キー、ローカルキーを指定が必要
    public function user() {
        return $this->belongsto('App\User');
    }

    //タグ機能で多対多のリレーションを組んで中間テーブルを使用するためtagsと紐づけ
    public function tags() {
        return $this->belongsToMany('App\Tag')->withTimestamps();
    }
}
