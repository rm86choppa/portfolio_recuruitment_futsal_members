<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    
    protected $guarded = array('id');

    //ハッシュタグ区切りのタグ情報を文字列として受け取り、配列に分割
    public function splitByTag($beforeSplitTag) {
        
        $return_data;

        //タグをハッシュタグ毎に分ける
        if (isset($beforeSplitTag)){

            $convertTagDatas = explode("＃", $beforeSplitTag);
            //最初のハッシュタグまでで1つの配列を作成してしまうので、空の要素は削除
            if ($convertTagDatas[0] == "") {
                unset($convertTagDatas[0]);
            }

            //重複削除
            $return_data = array_unique($convertTagDatas);

            return $return_data;
        }

        return $return_data;

    }

    //タグの配列を受け取り、DBに登録(タグは投稿テーブルと多対多なので重複の値は不要のため既存データは登録しない)
    public function insertTagData($afterSplitTags) {
        
        $post_tag_datas;
        
        //タグをハッシュタグ毎に分ける
        if (isset($afterSplitTags)){
            //全タグデータ追加(ユニークなので既に登録済の部分は追加しない)
            foreach ($afterSplitTags as $tagData) {
                //存在しないタグなら追加し追加データ取得、存在していたらデータ取得のみ
                $tagDatas = Tag::firstOrCreate(['tag' => $tagData]);
                $post_tag_datas[] = $tagDatas['id'];
            }
        }

        return $post_tag_datas;
    }

    //タグ機能で多対多のリレーションを組んで中間テーブルを使用するためpostsと紐づけ
    public function posts() {
        return $this->belongsToMany('App\Post')->withTimestamps();
    }
}
