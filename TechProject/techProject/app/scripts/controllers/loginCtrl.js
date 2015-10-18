'use strict';

angular.module('wepappApp')
    .controller('loginCtrl', function ($scope, $http, $cookies, $location, serverCommService,$window) {


        $scope.isUserLoggedIn = true;

        $scope.loginInfo = {
            email: "",
            password: ""
        };

        $scope.isUserLoggedIn = false;

        //Functions
        $scope.login = function () {



        };


        $scope.test = function(){

            alert('sasaasdsadsadsad');
        };

        $scope.loginUser = function(){

            //alert('sadsadadad');



            serverCommService.checkIfUserExists($scope.loginInfo.email, $scope.loginInfo.password, function(response){

                if(response['userExists'] == 1)
                {

                    alert('success');
                    $cookies.put('user', $scope.loginInfo.email);

                    if(response['project_name']  != null ){
                        $cookies.put('project_exists', 1);
                    }

                    if(response['admin'] == 1){
                        $cookies.put('admin', 1);
                    }
                    if(response['donator'] == 1){
                        $cookies.put('donator', 1);
                    }


                    $window.location.reload();
                    $location.path('/');
                    $window.location.reload();

                }
                else{

                    alert('No such user');
                    $location.path('/signup');

                }


            }, function(){});



        };

    });