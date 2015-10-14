angular.module('wepappApp')
    .controller('editProjectCtrl', function($scope, serverCommService,  $location, $sce) {


        $scope.init = function () {

            var projectName = $location.search().projectName;

            $scope.project = {
                projectName: projectName,
                goal: "",
                desc: "",
                video: "",
                images:[
                ]
            };
        }

    });
