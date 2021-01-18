<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ isset($title) ? $title: 'Eccomerce' }}</title>

    <!-- Scripts -->

    <!-- Fonts -->
    <link rel="stylesheet" href="{{asset('')}}plugins/fontawesome-free/css/all.min.css">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <!-- <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet"> -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <!-- Styles -->
    <link rel="stylesheet" href="{{asset('')}}plugins/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="{{asset('')}}css/main.css">
</head>
<body>
    <div id="app" style="background-color : rgb(236, 236, 236); ; margin:0;">

    </div>
    <script src="{{asset('')}}plugins/jquery/jquery.min.js"></script>

    <script src="/js/app.js"></script>

</body>
</html>
