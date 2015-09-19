<?php
;
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$link = mysqli_connect("localhost","root","","kickstarter") or die("Error " . mysqli_error($link));

$content = file_get_contents("php://input");
$data= json_decode($content);

if (isset($data->email)){
    $email = $data->email;
    $password = md5($data->password);

    $q = 'SELECT userId, email FROM kickstarter.users WHERE email="' . $email . '" AND password="' . $password . '"';

    $result = mysqli_query($link,$q);

    $data = array();

    while ($rows = mysqli_fetch_array($result)){
        $data = array(
            "userId" => $rows['userId'],
            "email" => $rows['email'],
            "login" => true
        );
    }

    echo json_encode($data);
}