<?php
require "checkSession.php"; //This will send the 401 if they're not logged in.
require "conn_mysql.php";
$link = mysqli_connect("localhost","root","","kickstarter") or die("Error " . mysqli_error($link));

//Retrieve user details
$username = $_SESSION['sessionId'];
$query = sprintf("SELECT * FROM users WHERE name='%s';", mysqli_real_escape_string($link,$username));
$result = mysqli_query($link,$query) or die("error");
if(mysqli_num_rows($result) == 0)
    die ("error");
//$arr = mysqli_fetch_assoc($result);
//Get the data
//$email = $arr["Email"];
$email = 'l123@gmail.com';
//Json encode
echo json_encode(array('username' => $username, 'email' => $email));
?>