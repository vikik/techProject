'use strict';

angular.module('wepappApp')
    .controller('signupCtrl', function ($scope, $http, $cookies, $location, serverCommService, $window){

    //Variables
    $scope.signupInfo = {
        name: "",
        email: "",
        password: ""
    };


        $scope.signup2 = function() {



            serverCommService.signUpNewUser($scope.signupInfo.name, $scope.signupInfo.email, $scope.signupInfo.password,  function(response){

                if(response['userCreated'] == 1)
                {

                    alert('Succes. User created.');
                    $cookies.put('user', $scope.signupInfo.email);
                    $window.location.reload();
                    $location.path('/');
                    $window.location.reload();

                }
                else{

                    alert('User already exists. Try a different');

                }


            }, function(){});


        }


});
