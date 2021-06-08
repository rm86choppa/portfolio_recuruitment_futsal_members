<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Post;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        //true変更で使用
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string',
            'recruitment_area' => 'required|string',
            'recruitment_level' => 'required|string',
            'practice_content' => 'required|string',
            'schedule' => 'required|string',
            'tag' => [
                function($attribute, $value, $fail) {
                    $requestDatas = $this->all();
                    if (isset($requestDatas['tag'])) {
                        //タグをハッシュタグ毎に分割後の配列を作成
                        $post = new Post;
                        $afterSplitTags = $post->splitByTag($requestDatas['tag']);

                        //最終的なタグが30個を超えたらエラー
                        if (count($afterSplitTags) > 30) {
                            $fail('1投稿でタグは最大30個までです');
                        }
                    }
                }],
        ];
    }

  
}
