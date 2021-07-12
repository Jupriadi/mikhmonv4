<?php 
error_reporting(0);
forbPHP();

// Route
function route($m_user,$page,$s_page){

    if (!array_key_exists($page,$s_page)){
        e404();

    }else if ($GLOBALS['n_uri_path'] > $GLOBALS['max_path']){
        e404();

    }else if ($GLOBALS['n_uri_path'] == $GLOBALS['max_path'] &&  $GLOBALS['act'] !== ""){
        e404();

    }else if (array_key_exists($page,$s_page)){
    
        include_once($s_page[$page]);

    }else{
        e404();
    }

}


// Forbidden 502
function forbPHP(){
    $get_self = explode("/",$_SERVER['PHP_SELF']);
    $self[] = $get_self[count($get_self)-1];

    if($self[0] !== "index.php"  && $self[0] !==""){
        e403();

    }
}



function e404(){
header('HTTP/1.0 404 Not Found', true, 404);
echo '
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>404 Not Found</title>
<link rel="icon" href="../../assets/img/favicon.png" />

<style>
*{-webkit-box-sizing:border-box;box-sizing:border-box}body{padding:10;margin:0}#error{position:relative;height:70vh}#error .error{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%, -50%);-ms-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}.error{max-width:520px;width:100%;line-height:1.4}.error .error-num{position:absolute;left:0;top:0;height:150px;width:200px;z-index:-1}.error .error-num h1{font-family:sans-serif;font-size:238px;font-weight:700;margin:0;color:#e3e3e3;text-transform:uppercase;letter-spacing:7px;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50% , -50%);-ms-transform:translate(-50% , -50%);transform:translate(-50% , -50%)}.error h2{font-family:sans-serif;font-size:28px;font-weight:400;text-transform:uppercase;color:#222;margin-top:12px;margin-bottom:15px}@media only screen and (max-width: 767px){.error .error-num{height:110px;line-height:110px}.error .error-num h1{font-size:170px}.error h2{font-size:24px;margin-left:20px}}@media only screen and (max-width: 480px){.error .error-num{left:40px}.error .error-num h1{font-size:120px}.error h2{font-size:18px;margin-left:20px}}
</style>

</head>
<body>
<div id="error">
<div class="error">
<div class="error-num">
<h1>404</h1>
</div>
<h2>Page not found!</h2>
</div>
</div>
</body>
</html>
';
die();
}
function e403(){
header('HTTP/1.0 403 Forbidden', true, 403);
echo '
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>403 Forbidden </title>
<link rel="icon" href="../../assets/img/favicon.png" />

<style>
*{-webkit-box-sizing:border-box;box-sizing:border-box}body{padding:10;margin:0}#error{position:relative;height:70vh}#error .error{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%, -50%);-ms-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}.error{max-width:520px;width:100%;line-height:1.4}.error .error-num{position:absolute;left:0;top:0;height:150px;width:200px;z-index:-1}.error .error-num h1{font-family:sans-serif;font-size:238px;font-weight:700;margin:0;color:#e3e3e3;text-transform:uppercase;letter-spacing:7px;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50% , -50%);-ms-transform:translate(-50% , -50%);transform:translate(-50% , -50%)}.error h2{font-family:sans-serif;font-size:28px;font-weight:400;text-transform:uppercase;color:#222;margin-top:12px;margin-bottom:15px}@media only screen and (max-width: 767px){.error .error-num{height:110px;line-height:110px}.error .error-num h1{font-size:170px}.error h2{font-size:24px;margin-left:20px}}@media only screen and (max-width: 480px){.error .error-num{left:40px}.error .error-num h1{font-size:120px}.error h2{font-size:18px;margin-left:20px}}
</style>

</head>
<body>
<div id="error">
<div class="error">
<div class="error-num">
<h1>403</h1>
</div>
<h2>Forbidden!</h2>
</div>
</div>
</body>
</html>
';
die();
}

function isMobile() {
    return preg_match("/(android|webos|avantgo|iphone|ipad|ipod|blackberry|iemobile|bolt|boost|cricket|docomo|fone|hiptop|mini|opera mini|kitkat|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
}