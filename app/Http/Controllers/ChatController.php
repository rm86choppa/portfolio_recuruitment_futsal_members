<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\PusherChat;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('chat');
    }

    public function chatSend() {
        $chat = ['id' => 1, 'name' => 'メールの確認']; 

        event(new PusherChat($chat));

        //event(new PusherChat);

        return response()->json();

    }
}
