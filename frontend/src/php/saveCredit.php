<?php

    // $file = "D:\Desktop\Programming\Site\src\js\json\credit.json";
    // if(file_exists($file)){
    //     $data = file_get_contents($file);
    //     $arrayData = json_decode($data, true);

    //     $new = array(
    //         'card'=> $_POST['card'];
    //         'balance'=> $_POST['balance'];
    //     );

    //     $arrayData[] = $new;
    //     $finalData = json_encode($arrayData);
    //     file_put_contents($file, $finalData);        
    // }
    if (function_exists('get_magic_quotes_gpc') && get_magic_quotes_gpc()) {
        function strip_slashes($input) {
            if (!is_array($input)) {
                return stripslashes($input);
            }
            else {
                return array_map('strip_slashes', $input);
            }
        }
        $_GET = strip_slashes($_GET);
        $_POST = strip_slashes($_POST);
        $_COOKIE = strip_slashes($_COOKIE);
        $_REQUEST = strip_slashes($_REQUEST);
    }

    function customError($errno, $errstr) {
        echo "<b>Error:</b> [$errno] $errstr<br>";
        echo "Ending Script";
        die("Ending Script");
    }
    set_error_handler("customError");

    $myData = $_GET["data"];

    $myFile = "../js/json/credit.json";
    $fileHandle = fopen($myFile, "w");

    fwrite($fileHandle, $myData);
    fclose($fileHandle);
?>