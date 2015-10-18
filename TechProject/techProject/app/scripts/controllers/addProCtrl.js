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


            $scope.user = $cookies.get('user');

            if( $cookies.get('project_exists') == 1 )
            {
                alert('Redirecting to your projects page');
                $location.path('/myProject');

            }


            //DEBUG
            //if(!$scope.user)
            //    $scope.user = 'andre';


        };



        $scope.getUser = function(ff, fc, tb){


            $scope.user = $cookies.get('user');

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



                },
                fileUploadError: function ($flow, $file, $message) {

                    console.log($flow);

                    console.log($message); // Note, you have to JSON.parse message yourself.
                }
        };


        $scope.createProject = function(){

            var user = $cookies.get('user');

            serverCommService.createProject(user, $scope.projectName, $scope.goal, $scope.endDate, $scope.desc, function(response){

                if(response['projectCreated'] == 1)
                {

                    alert('success');
                    $cookies.put('project_exists',1);
                    $location.path('/myProject');

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

