@extends('layouts.app')

@section('content')

    <h1>Pusher Test</h1>
<p>
    Try publishing an event to channel <code>my-channel</code>
    with event name <code>my-event</code>.
</p>
<a id="chat_link" href="{{ url('/chat') }}">
    {{ 'chat' }}
</a>
@endsection
