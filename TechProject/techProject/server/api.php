<?php
//require "conn_mysql.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$data = file_get_contents("php://input");
$data = json_decode($data);

/********LOGIN*******/

if(isset($data->action) && $data->action == 'login')
{
    $email = $data->user_name;
    $password = $data->password;

    $link = mysqli_connect("localhost","root","","kickstarter") or die("Error " . mysqli_error($link));

    $md5_password = md5($password);

    $query=sprintf("SELECT * FROM users WHERE email='%s' AND password='%s' LIMIT 1;", mysqli_real_escape_string($link, $email), mysqli_real_escape_string($link, $md5_password));
    $result = mysqli_query($link, $query);
    if(mysqli_num_rows($result) > 0){
        //$_SESSION['sessionId'] = $email;

        $row = $result->fetch_assoc();
//        echo $row["project_name"];
//        return;

            $response = array("err"=>0, "userExists" => 1, "project_name" => $row["project_name"]);



        echo json_encode($response);
        return;
    }

    else{

        $response = array( "userExists" => 0);

        echo json_encode($response);
        return;

    }
}


/******** projectDetails	*******/
/*
if(isset($data->projectName))
{
    $projectName = $data->projectName;

    $link = mysqli_connect("localhost","root","","kickstarter") or die("Error " . mysqli_error($link));

    $query=sprintf("SELECT * FROM projects WHERE projectName='%s' LIMIT 1;", mysqli_real_escape_string($link, $projectName));
    $result = mysqli_query($link, $query);
    if(mysqli_num_rows($result) > 0){

        $response = array("err"=>0, "projectExists" => 1);

        echo json_encode($response);
    }


    else{

        $response = array("err"=>0, "projectExists" => 0);

        echo json_encode($response);

    }
}
*/
/******** SignUp	*******/

if(isset($data->action) && $data->action == 'signUp')
{
    $email = $data->email;
    $password = md5($data->password);
    $name = $data->user_name;

    $link = mysqli_connect("localhost", "root", "", "kickstarter") or die("Error " . mysqli_error($link));

    $query = sprintf("INSERT INTO `users` (`email`, `password`, `name`) VALUES ('%s', '%s', '%s');", mysqli_real_escape_string($link, $email), mysqli_real_escape_string($link, $password), mysqli_real_escape_string($link, $name));
    $result = mysqli_query($link, $query);
    if($result)
        $response = array("err" => 0, "userCreated" => 1);
    else
        $response = array("err" => 0, "userCreated" => 0);

    echo json_encode($response);
//    if (mysqli_num_rows($result) > 0) {
//
//        $response = array("err" => 0, "userCreated" => 1);
//
//        echo json_encode($response);
//    } else {
//
//        $response = array("err" => 0, "userCreated" => 0);
//
//        echo json_encode($response);
//
//    }
};
/******** new project	*******/

if(isset($data->action) && $data->action == 'createProject')
{

    $projectsOwner = $data->user_name;
    $projectName= $data->project_name;
    $goal =$data->goal;
    $endDate = $data->end_date;
    $desc = $data->desc;

    $link = mysqli_connect("localhost","root","","kickstarter") or die("Error " . mysqli_error($link));
//    echo $projectsOwner ." " . $projectName ." " . $goal ." " . $endDate ." " . $desc;
//    return;



    $query = sprintf("UPDATE `users` SET `project_name`='%s', `goal`='%s', `end_date`='%s', `desc`='%s' WHERE `email`='%s' "  ,  mysqli_real_escape_string($link, $projectName), $goal, mysqli_real_escape_string($link, $endDate), mysqli_real_escape_string($link, $desc),  mysqli_real_escape_string($link, $projectsOwner));
//        echo $query;
//    return;
    $result = mysqli_query($link, $query);
    if($result)
        $response = array("err" => 0, "projectCreated" => 1);
    else
        $response = array("err" => 0, "projectCreated" => 0);

    echo json_encode($response);
}




if(isset($data->action) && $data->action == 'getUserImages')
{

    $user = $data->user_name;
    $userDir =  __DIR__ . DIRECTORY_SEPARATOR . 'users'. DIRECTORY_SEPARATOR . $user;

    $images = scandir($userDir);

    echo json_encode($images);

    return;


}



?>