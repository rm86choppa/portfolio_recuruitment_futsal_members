@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('メールアドレスを確認してください') }}</div>

                <div class="card-body">
                    @if (session('resent'))
                        <div class="alert alert-success" role="alert">
                            {{ __('新しい確認リンクを仮登録したメールアドレスに送信しました。') }}
                        </div>
                    @endif

                    {{ __('続行する前に、確認リンクについてメールを確認してください。') }}
                    {{ __('メールが届かない場合') }},
                    <form class="d-inline" method="POST" action="{{ route('verification.resend') }}">
                        @csrf
                        <button type="submit" class="btn btn-link p-0 m-0 align-baseline">{{ __('ここをクリックして再度リンクを送る') }}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
