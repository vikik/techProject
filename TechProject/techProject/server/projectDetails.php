<?php
require "conn_mysql.php";

$link = mysqli_connect("localhost","root","","kickstarter") or die("Error " . mysqli_error($link));
//$data = file_get_contents("php://input");

//$projectName = $data->projectName;

//$projectName = 'pro1';

$query=sprintf("SELECT * FROM projects WHERE projectName='%s' LIMIT 1;", mysqli_real_escape_string($link, $projectName));
$result = mysqli_query($link, $query);
if(mysqli_num_rows($result) > 0){
   
/*	
	$data = array();

	
while ($rows = mysql_fetch_array($result)){
    $data = array(
        "userId" => $rows['name'],
        "email" => $rows['email']'
        "login" => true,
    );
}
*/
//echo json_encode($data);

	
    echo "<script>
		alert('" .$projectName . " exist');
		</script>";
		
}else{
	echo "<script>
		alert('no such project: " .$projectName ."!');
		</script>";
}
$conn->close();