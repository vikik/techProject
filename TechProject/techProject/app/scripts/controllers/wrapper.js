'use strict';

angular.module('wepappApp')
    .controller('WrapperCtrl', function ($scope, $cookies) {

        $scope.init = function() {

            $scope.addPro = 0;
            $scope.proExist = 0;
            $scope.isAdmin = 0;
            $scope.logged = 0;

            if ($cookies.get('project_exists') == 1) {
                $scope.proExist = 1;
            }

            if ($cookies.get('project_exists') == undefined && $cookies.get('user') != undefined) {
                $scope.addPro = 1;
            }

            if ($cookies.get('user') != undefined) {
                $scope.logged = 1;
            }

            if ($cookies.get('admin') != undefined) {
                $scope.admin = 1;
            }

        }
        /*
         $rootScope.$on("$routeChangeStart", function (event, next) {
         if (!Auth.authorize(next.security)) {
         if (Auth.isLoggedIn()) {
         $location.path('/unauthorized');
         } else {
         $location.path('/login');
         }
         }
         });
         //*/
//
//    $scope.pageInit = function(){
//     // alert('ddddd');
//     //user login logic
//      $scope.isUserLoggedIn = Auth.isLoggedIn();
//      if($scope.isUserLoggedIn)
//      {
//        $scope.userName = Auth.getUserName();
//      }
//
//    };

    });
