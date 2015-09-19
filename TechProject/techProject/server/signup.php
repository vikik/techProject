<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$link = mysqli_connect("localhost","root","","newkick") or die("Error " . mysqli_error($link));

$data = file_get_contents("php://input");
$data = json_decode($data);

if(isset($data->email)) {

    $email = $data->email;
    $password = md5($data->password);
    $name = $data->name;

    $q = 'INSERT INTO newkick.users (email, password, name) VALUES ("' . $email . '", "' . $password . '", "' . $name . '")';

    $result = mysqli_query($link, $q);

    $last_id = mysqli_insert_id($link);

    $q = "SELECT userId, email, admin, donate FROM newkick.users WHERE userId = " . $last_id;
    $result = mysqli_query($link,$q);

    $data = array();

    while ($rows = mysqli_fetch_array($result)) {
        $data = array(
            "userId" => $rows['userId'],
            "email" => $rows['email'],
            "admin" => $rows['admin'],
            "donate" => $rows['donate']
        );
    }

    echo json_encode($data);
    return;
}
?>