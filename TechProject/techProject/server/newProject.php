<?php
require "checkSession.php"; //This will send the 401 if they're not logged in.
require "conn_mysql.php";
$link = mysqli_connect("localhost","root","","kickstarter") or die("Error " . mysqli_error($link));

$projectsOwner = $_SESSION['sessionId'];
$projectName = "pro1";
$goal = 4000;
$startDate = "2015-09-10 08:00:00";
$endDate = "2015-09-17 23:59:59";

if(strlen($projectName)<3 || strlen($projectName) > 15){
    die("User name must be longer than 4 characters and shorter than 10.");
}

$query = sprintf("INSERT INTO `projects` (`projectsOwner`, `projectName`, `goal`, `startDate`, `endDate`) VALUES ('%s', '%s', '%d', '%s', '%s');", mysqli_real_escape_string($link, $projectsOwner), mysqli_real_escape_string($link, $projectName), $goal, mysqli_real_escape_string($link, $startDate), mysqli_real_escape_string($link, $endDate));
echo $query;
$result = mysqli_query($link, $query)
    or die("Failed to make a new account, ".mysqli_error($link));

echo "<script>
alert('project: " .$projectName . " created successfully');
</script>";

?>