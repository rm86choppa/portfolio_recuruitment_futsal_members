<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Socialite\Contracts\User as ProviderUser;//SNSサイトから返ってきたユーザ情報
use App\Http\Controllers\Auth;

class Social extends Model
{
    protected $guarded = ['id'];//autoincrimentで、自動的に入るため値が代入されない

    //usersとの紐づけ(リレーション)
    //主テーブル名の単数_id(post_id)にしてる場合は特に必要ないが、それ以外の場合外部キー、ローカルキーを指定が必要
    public function user() 
    {
        return $this->belongsto('App\User', 'user_id', 'id');
    }

    //SNS連携したプロバイダーがすでに登録済なら、登録を省略
    public function create($providerInfo)
    {
        $provider = $providerInfo['provider'];
        $providerUser = $providerInfo['user'];

        //既に登録済なら検索で取得したusersテーブルの情報を返す(なければnullが返る)
        $account = $this->find($providerInfo);

        if($account) 
        {
            //SNS連携済なら、それに紐づくusersテーブルの情報を返す。(SNSサイトから渡された情報に変更がある可能性があるので更新)
            $user = User::find($account['user_id'])
                            ->update(['name' => $providerUser->getName(), 'email' => $providerUser->getEmail()]);;
            
            $user = User::find($account['user_id']);

            return $user;
        }

        //上記でまだ未登録だった場合、UsersテーブルにSNSサイトから渡されたメールアドレスで検索した情報があればそのユーザに紐づけ登録、
        //なければSNSサイトから渡されたメールアドレスで新規登録(同じユーザで既に登録があっても複数ＳＮＳで同じメールアドレスを登録してない場合、同じユーザか判断できないため別ユーザ扱いになるので注意)
        //Usersテーブルに登録すると紐づいてるSocialsテーブルにも設定される
        $user = User::where('email', $providerUser->getEmail())->first();
        if (!$user) {
            // 未作成ならここで作成する
            $user = User::create([  
                'email' => $providerUser->getEmail(),
                'name'  => $providerUser->getName(),
            ]);
        }

        // 取得(or作成)したusersテーブルに紐づくlinked_social_accountsのレコードを1行追加
        $user->accounts()->create([
            'provider_id'   => $providerUser->getId(),
            'provider_name' => $provider,
        ]);

        // 取得したusersテーブルの情報を返す
        return $user;

    }

    //プロバイダーIDで検索した結果を返す。
    public function find($providerInfo)
    {
        $provider = $providerInfo['provider'];
        $providerUser = $providerInfo['user'];

        $account = Social::where('provider_name', $provider)
        ->where('provider_id', $providerUser->getId())
        ->first();

        return $account;
    }
}
