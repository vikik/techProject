angular.module('wepappApp')
    .controller('proPageCtrl', function($scope, serverCommService,  $location, $sce) {



        $scope.init = function(){

            var projectName = $location.search().projectName;

            //alert(paramValue);

            //console.log($location.search());
            $scope.project = {
                projectName: projectName,
                goal: "",
                donated: 0,
                moneyLeft: 0,
                desc: "",
                video: "",
                images:[
                ]
            };

                serverCommService.getProjectDetailsByPName(projectName, function(response){
                    console.log(response);

                    if(response['proFoundByPName'] == 1) {
                        // alert("***********");
                        // console.log("**************" + $scope.project.projectName);
                        // console.log("---------" + response['project_name']);

                  //      $scope.project.projectName = response['project_name'];
                        $scope.project.goal = response['goal'];
                       // alert (response['goal']);
                        $scope.project.donated = response['donated'];
                        $scope.project.moneyLeft = response['goal'] - response['donated'];
                        $scope.project.desc = response['desc'];
                        $scope.project.video = $sce.trustAsResourceUrl(response['video']);

                    }
                }, function(){});

/*
                serverCommService.getUserImagesByPName( projectName, function(response){
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

                         //   $scope.project.images.push('http://localhost/kick_last/TechProject/techProject/server/users/'+$cookies.get('user_name')+"/"+response[i]);
                        }
                    }


                }, function(){});
            */
        };

        $scope.donate=function(donateAmount){

            var projectName = $location.search().projectName;

            serverCommService.donate(projectName , donateAmount, function(response){

                if(response['donated'] == 1)
                {

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
    });