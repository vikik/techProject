'use strict';

angular.module('wepappApp')
    .controller('loginCtrl', function ($scope, $http, $cookies, $location, serverCommService) {


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
                        $cookies.put('user_name', $scope.loginInfo.email);

                        console.log(response['project_name']);
                        console.log(response['project_name'].length);
                        if(response['project_name'].length > 0){
                            $cookies.put('project_exists', 1);

                        }


                        $location.path('/');

                    }
                    else{

                        alert('No such user');
                        $location.path('/signup');

                    }


                }, function(){});



            };

            });