'use strict';

angular.module('wepappApp')
  .controller('mainCtrl', function($scope) {
    $scope.projects =[
      {
        projectName: 'pro1',
        moneyTarget: '4000',
        endDate: '2015-09-30 08:00:00',
        image1: 'images/pro1/dofw.jpg',
        image2: 'images/pro1/dofw1.jpg'
      },
      {
        projectName: 'newPro',
        moneyTarget: '5000',
        endDate: '2015-09-30 08:00:00',
        image1: 'images/newPro/food.jpg'
      },
      {
        projectName: 'offBits2015',
        moneyTarget: '40000',
        endDate: '2015-09-30 08:00:00',
        image1: 'images/offBits2015/Offbits.jpg',
        image2: 'images/offBits2015/Offbits1.jpg',
        image3: 'images/offBits2015/Offbits2.jpg'
      }

    ];


    $scope.loadProjects = function(){


    };

  });
