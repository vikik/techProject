'use strict';

/**
 * @ngdoc overview
 * @name wepappApp
 * @description
 * # wepappApp
 *
 * Main module of the application.
 */
angular
  .module('wepappApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
        'flow',
    'ngTouch'
  ])

/*  .run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {

      if (!Auth.isLoggedIn()) {
        console.log('DENY');
        //event.preventDefault();
        $location.path('/guestPage');
      }
      else {
        console.log('ALLOW');
        $location.path('/');
      }
    });
  }])
*/

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl',
        controllerAs: 'login'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'contactCtrl',
        controllerAs: 'contact'
      })
        .when('/signup', {
          templateUrl: 'views/signup.html',
          controller: 'signupCtrl',
          controllerAs: 'signup'
        })
      .when('/projectPage', {
        templateUrl:  'views/projectPage.html',
        controller: 'proPageCtrl',
        controllerAs: 'proPage'
      })
      .when('/addProject', {
        templateUrl: 'views/addProject.html',
        controller: 'addProCtrl',
        controllerAs: 'addProject'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
