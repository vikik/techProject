/**
 * Created by VIKI on 08/08/2015.
 */

'use strict';

/**
 * @ngdoc function
 * @name wepappApp.controller:wrapper
 * @description
 * # wrapper
 * Controller of the wepappApp
 */
angular.module('wepappApp')
  .controller('WrapperCtrl', function ($scope, Auth) {

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
*/

    $scope.pageInit = function(){
     // alert('ddddd');
     //user login logic
      $scope.isUserLoggedIn = Auth.isLoggedIn();
      if($scope.isUserLoggedIn)
      {
        $scope.userName = Auth.getUserName();
      }

    };

  });
