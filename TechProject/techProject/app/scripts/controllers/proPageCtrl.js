angular.module('wepappApp')
    .controller('proPageCtrl', function($scope, serverCommService,  $location, $sce, $cookies) {



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
                    var checkMoney = response['goal'] - response['donated'];
                    if(checkMoney > 0){
                        $scope.project.moneyLeft = response['goal'] - response['donated'];
                    }
                    else
                    {
                        $scope.project.moneyLeft = 0;
                    }
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

        $scope.updateMoney = function(donateAmount)
        {
            var projectName = $location.search().projectName;


            serverCommService.donate(projectName , donateAmount, function(response){

                if(response['donatedProcess'] == 1)
                {
                    var details = prompt("Please enter your creditCard number", "For Example: 12-45-67");

                    if (details != null)
                    {
                        var user_name = $cookies.get('user_name');

                        serverCommService.updateUsersDonation(user_name,donateAmount, function(response){

                            if(response['creditSuccess'] == 1)
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
                                }
                            }
                            else {
                                alert('Failed to donate, please try again');
                            }
                        }, function(){});


                    }
                    else {
                        alert('Failed to donate, please try again');
                    }

                }

            }, function(){});
        }

        $scope.donate=function(donateAmount)
        {
            if($cookies.get("donator")==1)
            {
                $scope.updateMoney(donateAmount);
            }

            else if($cookies.get('user_name') == undefined) { //not a user
                //user not logged in or not exists

                alert('You need to be logged in to donate');
                $location.path('/login');
            }

            else if ($cookies.get("donator")== undefined && $cookies.get('user_name') != undefined){ //user exists but not donator
                //TO DO update 'donator' to 1 and add credit card

                var user_name = $cookies.get('user_name');

                serverCommService.updateDonator(user_name, function(response){

                    if(response['donatorUpdated'] == 1) {
                        $cookies.put('donator', 1);
                        alert('You Joined to the Donators List!');

                        $scope.updateMoney(donateAmount);
                    }

                    else{
                        alert('Failed to donate, please try again');
                    }
                }, function(){});

            }
        }
    });