/**
 * Created by VIKI on 03/09/2015.
 */

angular.module('wepappApp')
  .controller('proPageCtrl', function($scope,$cookies, serverCommService,  $location) {
  //$scope.increment =



        $scope.init = function(){


            $scope.project = {

                images:[



                ]



            };

            if($cookies.get('project_exists') == 1)
            {


                serverCommService.getUserImages( $cookies.get('user_name'), function(response){



                    //
                    //var arr = new Array(response['images']);
                    console.log(response.length);
                    //console.log(typeof arr);
                    if(response)
                    {
                        for(var  i = 0; i<response.length; i++)
                        {

                            if(response[i] == ".")
                                continue;
                            if(response[i] == "..")
                                continue;
                            $scope.project.images.push('http://localhost/TechProject/techProject/server/users/'+$cookies.get('user_name')+"/"+response[i]);
                        }


                    }




                    else{


                    }


                }, function(){});








                console.log('http://localhost/TechProject/techProject/server/users/'+$cookies.get('user_name'));







            }
            else{
                alert("You dont have a project, please add one");
                $location.path('/addProject');
            }




        };


    $scope.projects =[
      {
        projectName: 'pro1',
        moneyTarget: '4000',
        startDate: '2015-09-06 08:00:00',
        endDate: '2015-09-30 08:00:00',
        image1: 'images/pro1/Offbits.jpg',
        image2: 'images/pro1/Offbits1.jpg',
        image3: 'images/pro1/Offbits2.jpg'
      },
      {
        projectName: 'newPro',
        moneyTarget: '5000',
        startDate: '2015-09-06 08:00:00',
        endDate: '2015-09-30 08:00:00',
        image1: 'images/newPro/Offbits.jpg',
        image2: 'images/newPro/Offbits1.jpg',
        image3: 'images/newPro/Offbits2.jpg'
      },
      {
        projectName: 'offBits2015',
        moneyTarget: '40000',
        startDate: '2015-09-06 08:00:00',
        endDate: '2015-09-30 08:00:00',
        image1: 'images/offBits2015/Offbits.jpg',
        image2: 'images/offBits2015/Offbits1.jpg',
        image3: 'images/offBits2015/Offbits2.jpg'
      }

    ];
  });
