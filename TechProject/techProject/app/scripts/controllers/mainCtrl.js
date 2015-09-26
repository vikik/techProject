'use strict';

angular.module('wepappApp')
    .controller('mainCtrl', function($scope,$cookies, serverCommService, $location) {
        //$scope.increment =
        $scope.projects =[];
        $scope.init = function(){


            serverCommService.getAllProjects(function(response){

                //console.log(response.length);


                //   var projects = response['projects'];
                if(response.length > 0) {
                    _.forEach(response, function(p){

                        var proj = {
                            projectName: "",
                            goal: "",
                            donated: "",
                            desc: "",
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
                        getUserImages(proj);

                        $scope.projects.push(proj);
                    });
                }
            }, function(){});


        };


        var getUserImages = function(aProject){


            serverCommService.getUserImages(aProject['user_name'], function(response){

                //
                //var arr = new Array(response['images']);
                console.log(response);
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
                }
            }, function(){});


      //      console.log("=============");
      //      console.log('http://localhost/kick_last/TechProject/techProject/server/users/'+aProject['user_name']+"/");

        }

    });

