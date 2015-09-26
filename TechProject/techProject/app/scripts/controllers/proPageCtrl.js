/**
 * Created by VIKI on 03/09/2015.
 */

angular.module('wepappApp')
    .controller('proPageCtrl', function($scope,$cookies, serverCommService,  $location, $sce) {
        //$scope.increment =

        $scope.init = function(){


            $scope.project = {
                projectName: "",
                goal: "",
                donated: "",
                desc: "",
                video: "",
                images:[
                ]
            };



            if($cookies.get('project_exists') == 1)
            {
                serverCommService.getProjectDetails( $cookies.get('user_name'), function(response){

                    //console.log(response.length);

                    if(response['proFound'] == 1) {
                        // alert("***********");
                        // console.log("**************" + $scope.project.projectName);
                        // console.log("---------" + response['project_name']);

                        $scope.project.projectName = response['project_name'];
                        $scope.project.goal = response['goal'];
                        $scope.project.donated = response['donated'];
                        $scope.project.desc = response['desc'];
                        $scope.project.video = $sce.trustAsResourceUrl(response['video']);


                        //$scope.project.video = $sce.trustAsResourceUrl(response['video']);

                        // alert ($scope.project.projectName);


                    }
                }, function(){});


            }
            else{
                alert("You dont have a project, please add one");
                $location.path('/addProject');
            }



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

                            $scope.project.images.push('http://localhost/kick_last/TechProject/techProject/server/users/'+$cookies.get('user_name')+"/"+response[i]);
                        }
                    }


                }, function(){});

            }
            else{
                alert("You dont have a project, please add one");
                $location.path('/addProject');
            }


        };

        $scope.donate=function(donateAmount){

            serverCommService.donate(function(response){

                if(response['donated'] == 1)
                {

                    alert("Thank you!");

                    $location.path('/projectPage');

                }
                else{
                    alert('Failed to donate');
                }


            }, function(){});


        }
    });


/*
 $scope.projects =[
 {
 projectName: 'pro165656',
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
 */