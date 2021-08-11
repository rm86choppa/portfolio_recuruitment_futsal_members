<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Tag;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\PostRequest;

class PostController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //.env に APP_ENV=local (ローカル環境) または APP_ENV=testing (テスト環境) と書いてある場合
        if ( app()->isLocal() || app()->runningUnitTests() ) { 
            // テスト環境, ローカル環境用の記述
            //テスト的に認証なしでも機能を使用する
        }
        //.env に APP_ENV=production (本番環境) などと書いてあった場合
        else { 
            // 本番環境用の記述
            $this->middleware('auth');
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('newPost');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return redirect('newPost');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostRequest $request)
    {
        $requestDatas = $request->all();
        
        $post_tag_datas;
        //複数のDBを更新するため、一部の失敗等でのデータ不整合を防ぐためトランザクションを使用しDB更新が全て成功でコミット
        DB::beginTransaction();
        try {

            if(isset($requestDatas['tag'])) {
                $tag = new Tag;
                //タグを配列に変換
                $afterSplitTags = $tag->splitByTag($requestDatas['tag']);

                if(isset($afterSplitTags)) {
                    //タグ登録
                    $post_tag_datas = $tag->insertTagData($afterSplitTags);
                }
            }

            //投稿の不要なデータ削除
            unset($requestDatas['_token']);
            unset($requestDatas['tag']);

            //投稿内容を新規追加
            $post = new Post;
            $post->fill($requestDatas)->save();

            //追加した投稿のID取得
            $insertedId = $post->id;

            //中間テーブル更新
            $search_post = Post::find($insertedId);

            //新規登録
            if (isset($post_tag_datas)) {
                $search_post->tags()->attach($post_tag_datas);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Session::flash('flash_message', '登録が失敗しました');
            return back();
        }

        \Session::flash('flash_message', '登録が完了しました');
        return redirect('newPost');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($postID)
    {
        $post = Post::find($postID);

        //タグ取得
        $tags_display_format = "";
        foreach ($post->tags as $tag) {
            $tags_display_format = $tags_display_format.'＃'.$tag->tag;
        }

        //編集画面での更新完了後の遷移先をマイページにするようURL情報を作成
        $URL = 'post/'.$postID;

        return view('editPost', compact('post', 'tags_display_format', 'URL'));
    }

    /**
     * タグ、投稿、中間テーブル(どの投稿にどのタグが紐づいてるか管理してるテーブル)の更新
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PostRequest $request, $post_id)
    {
        $tag = new Tag;
        //タグを配列に変換
        $afterSplitTags = $tag->splitByTag($request->tag);

        //タグ登録
        $post_tag_datas = $tag->insertTagData($afterSplitTags);

        //投稿の更新
        $result = Post::find($post_id)->update(['title' => $request->title, 
                                                'recruitment_area' => $request->recruitment_area, 
                                                'recruitment_level' => $request->recruitment_level, 
                                                'practice_content' => $request->practice_content, 
                                                'schedule' => $request->schedule, 
                                                'recruitment_area_prefecture' => $request->recruitment_area_prefecture]);

        //中間テーブル更新
        $post =  Post::find($post_id);

        //新規登録
        $tags_display_format = "";
        if (isset($post_tag_datas)) {
            //更新し直しするため、syncを使用
            //(今まで紐づけされてた情報は不要で、リクエストでもらったタグ情報のみDBに保存される状態にする)
            $post->tags()->sync($post_tag_datas);

            $tags_display_format = $request->tag;
        }

        \Session::flash('flash_message', '更新が完了しました');

        return redirect('home');
    }

    /**
     * 引数で受け取った投稿IDで検索して一致したレコード削除
     *
     * @param  string $redirect_page
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($post_id)
    {
        Post::find($post_id)->delete();

        //元のページに遷移(表示は更新される)
        return back();
    }
}
