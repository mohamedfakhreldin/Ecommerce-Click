@extends('layouts.app')

@section('content')
<div id="example" data="{{json_encode(['email'=>Auth::user()->email,'id'=>Auth::id(),'name'=>Auth::user()->name])}}"></div>


@endsection
