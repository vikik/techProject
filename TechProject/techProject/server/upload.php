<?php


header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    //echo "dfdsfsfs";
//return;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {


//    $data = json_decode($_GET);

    $user = $_POST['user'];
    $userDir =  __DIR__ . DIRECTORY_SEPARATOR . 'users'. DIRECTORY_SEPARATOR . $user;


    $response = array('err' => '0', 'errorFiles'=>'', 'msg' => 'm', 'user_name'=> 'user', 'images'=>'');


    $error = false;
    $errorFiles = array();

    $files = array();
    if (!file_exists($userDir)) {
        mkdir($userDir);
    }

    $counter =0;
    $debugCounter =0;

    foreach($_FILES as $file)
    {
        $debugCounter++;
        if(move_uploaded_file($file['tmp_name'], $userDir . DIRECTORY_SEPARATOR .basename($file['name'])))
        {
            $files[] = $file['name'];
            // writeToFile('users.txt', $userFolder);

        }
        else
        {
            $error = true;
            $errorFiles[$counter] = $file['name'];
            $counter++;
        }
    }


    if($error)
    {
        $response['msg'] = 'error in file moving';
        $response['err'] = 1;
        $response['errorFiles'] = $errorFiles;
    }
    else
    {
        $response['err'] = 0;
        $response['images'] = $files;
    }


    echo json_encode($response);


}

//$tempDir = __DIR__ . DIRECTORY_SEPARATOR . 'temp';
//if (!file_exists($tempDir)) {
//	mkdir($tempDir);
//}
?>