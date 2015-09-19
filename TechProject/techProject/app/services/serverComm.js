/**
 * Created by VIKI on 08/08/2015.
 */


angular.module('wepappApp')
  .service('serverCommService', function ($http) {




        this.createProject = function (userName, projectName, goal, endDate, desc, successCB, failedCB) {

            var url = 'http://localhost/TechProject/techProject/server/api.php';
            console.log(url);
            var data = {
                action: 'createProject',
                user_name: userName,
                goal: goal,
                project_name: projectName,
                end_date: endDate,
                desc: desc
            };

            this.sendToServer(data, url,
                function (response) {
                    if (!response.err) {
                        // toastr.success(response.data.response);
                        // alert('sadasdasdasdasdasdsadsadasd');
                        console.log(response);
                        successCB(response);
                        console.log("Service");
                    }
                },
                function (e) {
                    alert('Server error - please try again later');
                    console.log(e);
                    alert('Server error - please try again later');
                }
            );
        };



    this.checkIfUserExists = function (userName, password, successCB, failedCB) {

      var url = 'http://localhost/TechProject/techProject/server/api.php';
      console.log(url);
      var data = {
          action: 'login',
        user_name: userName,
        password: password
      };

      this.sendToServer(data, url,
        function (response) {
          if (!response.err) {
            // toastr.success(response.data.response);
            // alert('sadasdasdasdasdasdsadsadasd');
            console.log(response);
              successCB(response);
            console.log("Service");
          }
        },
        function (e) {
          alert('Server error - please try again later');
          console.log(e);
          alert('Server error - please try again later');
        }
      );
    };


        this.signUpNewUser = function (userName, email, password, successCB, failedCB) {

            var url = 'http://localhost/TechProject/techProject/server/api.php';
            console.log(url);
            var data = {
                action: 'signUp',
                user_name: userName,
                password: password,
                email: email

            };

            this.sendToServer(data, url,
                function (response) {
                    if (!response.err) {
                        // toastr.success(response.data.response);
                        // alert('sadasdasdasdasdasdsadsadasd');
                        console.log(response);
                        successCB(response);
                        console.log("Service");
                    }
                },
                function (e) {
                    alert('Server error - please try again later');
                    console.log(e);
                    alert('Server error - please try again later');
                }
            );
        };


        this.getUserImages = function (userName, successCB, failedCB) {

            var url = 'http://localhost/TechProject/techProject/server/api.php';
            console.log(url);
            var data = {
                action: 'getUserImages',
                user_name: userName


            };

            this.sendToServer(data, url,
                function (response) {
                    if (!response.err) {
                        // toastr.success(response.data.response);
                        // alert('sadasdasdasdasdasdsadsadasd');
                        console.log(response);
                        successCB(response);
                        console.log("Service");
                    }
                },
                function (e) {
                    alert('Server error - please try again later');
                    console.log(e);
                    alert('Server error - please try again later');
                }
            );
        };



        this.sendToServer = function (data, url, callbackSuccess, callbackError) {

      $http({
        method: 'POST',
        url: url,
        timeout: 7000,
        data: data
      })
        .success(function (response) {
          callbackSuccess(response);
        })
        .error(function (e) {
          callbackError(e);
        });

    };




    });
