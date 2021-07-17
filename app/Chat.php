<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $guarded = array('id');

    public function post()
    {
        return $this->belongsTo('App\Post');
    }
}
