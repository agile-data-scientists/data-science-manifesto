@extends('master')

@section('content')
    <div class="container-holder">
        <article id="parseMd" class="container-narrow">{!! $contents !!}</article>
    </div>
@endsection