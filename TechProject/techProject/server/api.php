<?php
//require "conn_mysql.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('X-Frame-Options: GOFORIT');

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

if(isset($data->action) && $data->action == 'projectFound')
{
    $email = $data->user_name;
    $link = mysqli_connect("localhost","root","","kickstarter") or die("Error " . mysqli_error($link));

    $query=sprintf("SELECT * FROM users WHERE email='%s' LIMIT 1;", mysqli_real_escape_string($link, $email));
    $result = mysqli_query($link, $query);
    if(mysqli_num_rows($result) > 0){

        $row = $result->fetch_assoc();
        $response = array("err"=>0, "proFound" => 1, "project_name" => $row["project_name"], "donated" => $row["donated"], "goal" => $row["goal"], "desc" => $row["desc"], "video" => $row["video"]);
        echo json_encode($response);
        return;
    }

    else{

        $response = array("proFound" => 0);

        echo json_encode($response);
        return;
    }
}

/******** allProjects	*******/
if(isset($data->action) && $data->action == 'allProjects')
{
    $link = mysqli_connect("localhost","root","","kickstarter") or die("Error " . mysqli_error($link));

    $query=sprintf('SELECT * FROM users WHERE `project_name` <> "";');
    $result = mysqli_query($link, $query);
    $resultSet = array();

    while($row = mysqli_fetch_array($result)) {
        $resultSet[] = $row;
        //echo $resultSet;
    }
    echo  json_encode($resultSet);

    return;

    /*
        else{

            $response = array("allPro" => 0);

            echo json_encode($response);
            return;
        }
    */

}

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

/******** update donation	*******/
if(isset($data->action) && $data->action == 'updateDonation')
{
    $userName= $data->user_name;
    $donate_amount = $data->donate_amount;

    $link = mysqli_connect("localhost","root","","kickstarter") or die("Error " . mysqli_error($link));

    $query1 =sprintf("SELECT `goal`, `donated` FROM `users` WHERE `email`='%s' LIMIT 1;", mysqli_real_escape_string($link, $userName));
    $result = mysqli_query($link, $query1);

    $resultSet = array();

    while($row = mysqli_fetch_array($result)) {
        $resultSet = $row;
        //echo $resultSet;
    }

    $goal = $resultSet['goal'];
    $donated = $resultSet['donated'];

    $newDonated = $donated + $donate_amount;

    //TODO VIKI UPDATE STATEMENT AND ECHO BACK RESPONSE STATING IF UPDATE HAS SUCCEEDED OR FAILD

    $query = sprintf("UPDATE `users` SET `donated`='%d' WHERE `email`='%s'" , $newDonated, $userName);

    $result = mysqli_query($link, $query);
    if($result)
        $response = array("err" => 0, "donated" => 1);
    else
        $response = array("err" => 1, "donated" => 0);

    echo json_encode($response);

    /*
    $response = array("err"=>0, "donated"=>1);
    echo json_encode($response);
    */
}

/************* get user images ************/
if(isset($data->action) && $data->action == 'getUserImages')
{


//    echo $data->user_name;
//    return;
    $user = $data->user_name;
    $userDir =  __DIR__ . DIRECTORY_SEPARATOR . 'users'. DIRECTORY_SEPARATOR . $user;

//    echo $userDir;
//    return;
    try {
        $images = scandir($userDir);
        echo json_encode($images);

    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
    }


  //      echo "error";


    return;


}



?>