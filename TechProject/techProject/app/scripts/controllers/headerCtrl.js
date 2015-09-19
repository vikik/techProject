/**
 * Created by VIKI on 20/08/2015.
 */

'use strict';

/**
 * @ngdoc function
 * @name wepappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wepappApp
 */

angular.module('wepappApp')
  .controller('headerCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  });
