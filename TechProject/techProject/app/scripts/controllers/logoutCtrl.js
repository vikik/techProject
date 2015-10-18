'use strict';

angular.module('wepappApp')
    .controller('logoutCtrl', function($scope,$cookies, $location, $window){

        if($cookies.get('user') != undefined){
            $cookies.remove('user');
        }

        if($cookies.get('project_exists') != undefined){
            $cookies.remove('project_exists');
        }

        if($cookies.get('admin') != undefined){
            $cookies.remove('admin');
        }

        if($cookies.get('donator') != undefined){
            $cookies.remove('donator');
        }

        alert("Good Bye!");

        $window.location.reload();
        $location.path('/');

    });