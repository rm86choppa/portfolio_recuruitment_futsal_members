<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    
    protected $guarded = array('id');

    //タグ機能で多対多のリレーションを組んで中間テーブルを使用するためpostsと紐づけ
    public function posts() {
        return $this->belongsToMany('App\Post')->withTimestamps();
    }
}
