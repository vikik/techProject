angular.module('wepappApp')
    .controller('myProjectCtrl', function($scope,$cookies, serverCommService,  $location, $sce) {

        $scope.init = function(){

            $scope.project = {
                projectName: "",
                goal: "",
                donated: 0,
                moneyLeft: 0,
                endDate:"",
                desc: "",
                video: "",
                images:[
                ]
            };

            if($cookies.get('project_exists') == 1)
            {
                serverCommService.getProjectDetails( $cookies.get('user'), function(response){

                    //console.log(response.length);

                    if(response['proFound'] == 1) {
                        // alert("***********");
                        // console.log("**************" + $scope.project.projectName);
                        // console.log("---------" + response['project_name']);

                        $scope.project.projectName = response['project_name'];
                        $scope.project.goal = response['goal'];
                        $scope.project.endDate = response['endDate'];
                        $scope.project.donated = response['donated'];
                        var checkMoneyleft =  response['goal'] - response['donated'];
                        if (checkMoneyleft>0){
                            $scope.project.moneyLeft = response['goal'] - response['donated'];
                        }
                        else{
                            $scope.project.moneyLeft = 0;
                        }

                        $scope.project.desc = response['desc'];
                        $scope.project.video = $sce.trustAsResourceUrl(response['video']);

                        $scope.labels = ["Donated", "Left To Race", "Goal"];
                        $scope.data = [$scope.project.donated, $scope.project.moneyLeft, $scope.project.goal];
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
                serverCommService.getUserImages( $cookies.get('user'), function(response){
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

                            $scope.project.images.push('http://localhost/kick_last/TechProject/techProject/server/users/'+$cookies.get('user')+"/"+response[i]);
                        }
                    }


                }, function(){});

            }
            else{
                alert("You dont have a project, please add one");
                $location.path('/addProject');
            }
        };
/*
        $scope.donate=function(donateAmount){

            serverCommService.donate($cookies.get('user_name'), donateAmount, function(response){

                if(response['donated'] == 1)
                {

                    alert();

                    alert("Thank you!");
                    $scope.project.donated = parseInt($scope.project.donated) + parseInt(donateAmount);
                    var checkMoneyLeft = $scope.project.goal - $scope.project.donated;
                    //alert(checkMoneyLeft);
                    if(checkMoneyLeft >= 0){
                        $scope.project.moneyLeft = checkMoneyLeft
                    }
                    else{
                        $scope.project.moneyLeft = 0;
                    };

                    //  $scope.project.moneyLeft = $scope.project.goal - $scope.project.donated;

                }
                else{
                    alert('Failed to donate, please try again');
                }


            }, function(){});
        }
        */
    });