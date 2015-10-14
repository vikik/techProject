'use strict';


angular.module('wepappApp')
    .controller('adminCtrl', function ($scope,$cookies, serverCommService, $location) {
        $scope.projects =[];
        $scope.amount = 0;
        $scope.donators = [];
        $scope.dAmount = 0;


        $scope.init = function() {

            if ($cookies.get("admin")==1) {

                serverCommService.getForAdmin(function (response) {

                    //   var projects = response['projects'];
                    if (response.length > 0) {
                        $scope.amount = response.length;
                        _.forEach(response, function (p) {

                            var proj = {
                                projectName: "",
                                pOwner: "",
                                goal: "",
                                donated: "",
                                desc: "",
                                user_name: "",
                                moneyLeft: 0
                            };
                            //console.log($scope.projects);
                            //console.log(proj);
                            proj['project_name'] = p['project_name'];
                            proj['pOwner'] = p['name'];
                            proj['goal'] = p['goal'];
                            proj['donated'] = p['donated'];
                            proj['desc'] = p['desc'];
                            var checkMoney = p['goal'] - p['donated'];
                            if(checkMoney > 0){
                                proj['moneyLeft'] = p['goal'] - p['donated'];
                            }
                            else
                            {
                                proj['moneyLeft'] = 0;
                            }
                            //proj['images'] = p['images'];
                            proj['user_name'] = p['email'];

                            $scope.projects.push(proj);

                        });
                    }
                }, function () {
                });

            }
            else{
                alert("you're not an admin!")
                $location.path('/main');
            }


            if ($cookies.get("admin")==1) {

                serverCommService.getDonators(function (response) {

                    //   var projects = response['projects'];
                    if (response.length > 0) {
                        $scope.dAmount = response.length;
                        _.forEach(response, function (d) {

                            var dntrs = {
                                donatortName: "",
                                dDonated: "",
                                dEmail: ""
                            };
                            //console.log($scope.projects);
                            //console.log(proj);
                            dntrs['donatortName'] = d['name'];
                            dntrs['dEmail'] = d['email'];
                            dntrs['dDonated'] = d['dDonated'];

                            $scope.donators.push(dntrs);

                        });
                    }
                }, function () {
                });

            }
            else{
                alert("you're not an admin!")
                $location.path('/main');
            }

        };

    });