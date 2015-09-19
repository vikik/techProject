<?php

require "checkSession.php"; //This will send the 401 if they're not logged in.
require "conn_mysql.php";
$link = mysqli_connect("localhost","root","","kickstarter") or die("Error " . mysqli_error($link));

//Retrieve user details
$username = $_SESSION['sessionId'];
//curr_priv =  //get privilege
$new_privil = 2;		//change due to curr_priv

$query = sprintf("UPDATE `users` SET `privilege`=2 WHERE `name`='%s';", mysqli_real_escape_string($link,$username));
$result = mysqli_query($link,$query) or die("Failed to change privilege, ".mysqli_error($link));



?>