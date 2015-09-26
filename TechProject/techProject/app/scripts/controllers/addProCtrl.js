/**
 * Created by VIKI on 20/08/2015.
 */

'use strict';

/**
 * @ngdoc function
 * @name wepappApp.controller:addProCtrl
 * @description
 * # addProCtrl
 * Controller of the wepappApp

 */

angular.module('wepappApp')
  .controller('addProCtrl', function($scope, $location,  $cookies, serverCommService) {

    $scope.projectName ='';
    $scope.goal ='';
    $scope.desc ='';
    $scope.endDate ='';


        $scope.init = function(){


            $scope.user = $cookies.get('user_name');

            if( $cookies.get('project_exists') == 1 )
            {
                alert('Redirecting to your projects page');
                $location.path('/projectPage');

            }


            //DEBUG
            //if(!$scope.user)
            //    $scope.user = 'andre';


        };



        $scope.getUser = function(ff, fc, tb){


            $scope.user = $cookies.get('user_name');

            //DEBUG
            if(!$scope.user)
                $scope.user = 'v123@gmail.com';


            return {user:    $scope.user };
        };


        $scope.uploader = {

                controllerFn: function ($flow, $file, $message) {
                    //console.log($flow, $file, $message); // Note, you have to JSON.parse message yourself.


                    console.log($message);

                    $file.msg = $message;// Just display message for a convenience


                    alert("File uploded successfully!");

                },
                fileUploadError: function ($flow, $file, $message) {

                    console.log($message); // Note, you have to JSON.parse message yourself.
                }
        };


        $scope.createProject = function(){


            serverCommService.createProject($scope.user, $scope.projectName, $scope.goal, $scope.endDate, $scope.desc, function(response){

                if(response['projectCreated'] == 1)
                {

                    alert('success');
                    $cookies.put('project_exists',1);
                    $location.path('/projectPage');

                }
                else{

                    alert('Failed to create project');

                }


            }, function(){});




        };



        $scope.uploadFile = function(flowObj){

            console.log( flowObj.opts.target);
            flowObj.opts.target = 'http://localhost/TechProject/techProject/server/upload.php';
            flowObj.upload();



            console.log(flowObj);
            //alert(url);

        };

//    $scope.addProject = function() {
//
//
//
//     // $routeProvider=""
//     // onclick="location.href='#/login';"
//1    }


});

