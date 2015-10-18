'use strict';

angular.module('wepappApp')
    .controller('mainCtrl', function($scope,$cookies, serverCommService) {
        //$scope.increment =
        $scope.projects =[];
        $scope.amount = 0;
        var proExist = 0;
        $scope.addPro = 0;

        $scope.init = function(){

            if($cookies.get('project_exists') == 1){
                proExist = 1;
            }

            if ($cookies.get('project_exists') == undefined && $cookies.get('user') != undefined) {
                $scope.addPro = 1;
            }


            serverCommService.getAllProjects(function(response){

                //   var projects = response['projects'];
                if(response.length > 0) {
                    $scope.amount = response.length;
                    _.forEach(response, function(p){

                        var proj = {
                            projectName: "",
                            goal: "",
                            donated: "",
                            desc: "",
                            moneyLeft: 0,
                            user_name: "",
                            images: []
                        };
                        //console.log($scope.projects);
                        //console.log(proj);
                        proj['project_name'] = p['project_name'];
                        proj['goal'] = p['goal'];
                        proj['donated'] = p['donated'];
                        proj['desc'] = p['desc'];
                        //proj['images'] = p['images'];
                        proj['user_name'] = p['email'];
                        var checkMoneyleft =  p['goal'] - p['donated'];
                        if (checkMoneyleft>0){
                            proj['moneyLeft'] = p['goal'] - p['donated'];
                        }
                        else{
                            proj['moneyLeft'] = 0;
                        }
                        getUserImages(proj);

                        $scope.projects.push(proj);

                    });
                }
            }, function(){});


        };

        var getUserImages = function(aProject){


            serverCommService.getUserImages(aProject['user_name'], function(response){

                //
                // console.log("images for user: "+aProject['user_name']);
                // console.log(response);
                //console.log(typeof arr);
                if(response)
                {
                    for(var  i = 0; i<response.length; i++)
                    {

                        if(response[i] == ".")
                            continue;
                        if(response[i] == "..")
                            continue;
                        aProject['images'].push('http://localhost/kick_last/TechProject/techProject/server/users/'+aProject['user_name']+"/"+response[i]);
                    }
                    //console.log("images full paths for user: "+aProject['user_name']);
                    //console.log(aProject['images']);
                }
            }, function(){});


            //      console.log("=============");
            //      console.log('http://localhost/kick_last/TechProject/techProject/server/users/'+aProject['user_name']+"/");

        }

    });

