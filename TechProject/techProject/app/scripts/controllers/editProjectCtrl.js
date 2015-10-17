angular.module('wepappApp')
    .controller('editProjectCtrl', function($scope, serverCommService,  $location, $sce) {


        $scope.init = function () {

            var projectName = $location.search().projectName;

            $scope.project = {
                projectName: projectName,
                goal: "",
                desc: ""
            };
        }

        $scope.UpdateProject = function(){
            var projectName = $location.search().projectName;
            serverCommService.UpdateProject(projectName, $scope.goal, $scope.desc, function(response){

                if(response['projectUpdated'] == 1)
                {
                    alert('Updated successfuly');
                    $location.path('/myProject');
                }
                else{
                    alert('Failed to update project');
                }

            }, function(){});
        };

    });
