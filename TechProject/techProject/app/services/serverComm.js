/**
 * Created by VIKI on 08/08/2015.
 */


angular.module('wepappApp')
    .service('serverCommService', function ($http) {

        this.createProject = function (user, projectName, goal, endDate, desc, successCB, failedCB) {

            console.log(user);

            var url = 'http://localhost/kick_last/TechProject/techProject/server/api.php';
            console.log(url);
            var data = {
                action: 'createProject',
                user_name: user,
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
                    //alert('Server error - please try again later');
                    //console.log(e);
                    //alert('Server error - please try again later');
                }
            );
        };

        this.checkIfUserExists = function (userName, password, successCB, failedCB) {

            var url = 'http://localhost/kick_last/TechProject/techProject/server/api.php';
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
                    //alert('Server error - please try again later');
                    //console.log(e);
                    //alert('Server error - please try again later');
                }
            );
        };

        this.signUpNewUser = function (userName, email, password, successCB, failedCB) {

            var url = 'http://localhost/kick_last/TechProject/techProject/server/api.php';
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
                    //alert('Server error - please try again later');
                    //console.log(e);
                    //alert('Server error - please try again later');
                }
            );
        };

        this.getUserImages = function (userName, successCB, failedCB) {

            var url = 'http://localhost/kick_last/TechProject/techProject/server/api.php';
            //        console.log(url);
            var data = {
                action: 'getUserImages',
                user_name: userName


            };

            this.sendToServer(data, url,
                function (response) {
                    if (!response.err) {
                        // toastr.success(response.data.response);
                        // alert('sadasdasdasdasdasdsadsadasd');
                        // console.log(response);
                        successCB(response);
                        //console.log("Service");
                    }
                },
                function (e) {
                    //alert('Server error - please try again later');
                    //console.log(e);
                    //alert('Server error - please try again later');
                }
            );
        };

        this.getUserImagesByPName = function (projectName, successCB, failedCB) {

            var url = 'http://localhost/kick_last/TechProject/techProject/server/api.php';
            console.log(url);
            var data = {
                action: 'getUserImagesByPName',
                project_name: projectName


            };

            this.sendToServer(data, url,
                function (response) {
                    if (!response.err) {
                        // toastr.success(response.data.response);
                        // alert('sadasdasdasdasdasdsadsadasd');
                        // console.log(response);
                        successCB(response);
                        console.log("Service");
                    }
                },
                function (e) {
                    //alert('Server error - please try again later');
                    //console.log(e);
                    //alert('Server error - please try again later');
                }
            );
        };

        this.getProjectDetails = function (userName, successCB, failedCB) {
            var url = 'http://localhost/kick_last/TechProject/techProject/server/api.php';

            var data = {
                action: 'projectFound',
                user_name: userName
            };

            this.sendToServer(data, url,
                function (response) {
                    if (!response.err) {
                        // toastr.success(response.data.response);
                        //alert('sadasdasdasdasdasdsadsadasd');
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

        this.getProjectDetailsByPName = function (projectName, successCB, failedCB) {
            var url = 'http://localhost/kick_last/TechProject/techProject/server/api.php';
            console.log(url);
            var data = {
                action: 'projectFoundByPN',
                project_name: projectName
            };

            this.sendToServer(data, url,
                function (response) {
                    if (!response.err) {
                        // toastr.success(response.data.response);
                        //alert('sadasdasdasdasdasdsadsadasd');
                        //   console.log(response);
                        successCB(response);
                        // console.log("Service");
                    }
                },
                function (e) {
                    //alert('Server error - please try again later');
                    //console.log(e);
                    //alert('Server error - please try again later');
                }
            );
        };

        this.getAllProjects = function (successCB, failedCB) {
            var url = 'http://localhost/kick_last/TechProject/techProject/server/api.php';
          //  console.log(url);
            var data = {
                action: 'allProjects'
            };

            this.sendToServer(data, url,
                function (response) {
                    if (!response.err) {
                         //toastr.success(response.data.response);
                        console.log(response);
                        successCB(response);
                         console.log("Service");
                    }
                },
                function (e) {
                    //alert('Server error - please try again later');
                    console.log(e);
                    //alert('Server error - please try again later');
                }
            );
        };

        this.getForAdmin = function (successCB, failedCB) {
            var url = 'http://localhost/kick_last/TechProject/techProject/server/api.php';
            console.log(url);
            var data = {
                action: 'adminPage'
            };

            this.sendToServer(data, url,
                function (response) {

                    if (!response.err) {
                        // toastr.success(response.data.response);
                        console.log(response);
                        successCB(response);
                        // console.log("Service");
                    }
                },
                function (e) {
                    //alert('Server error - please try again later');
                    //console.log(e);
                    //alert('Server error - please try again later');
                }
            );
        };

        this.donate = function (projectName, donateAmount, successCB, failedCB) {
            var url = 'http://localhost/kick_last/TechProject/techProject/server/api.php';
            var data = {
                action: 'updateDonation',
                project_name: projectName,
                donate_amount: donateAmount

            };

            this.sendToServer(data, url,
                function (response) {
                    if (!response.err) {
                        // toastr.success(response.data.response);
                        ////alert('sadasdasdasdasdasdsadsadasd');
                        console.log(response);
                        successCB(response);
                        //console.log("Service");
                    }
                },
                function (e) {
                    //alert('Server error - please try again later');
                    //console.log(e);
                    //alert('Server error - please try again later');
                }
            );
        };

        this.updateUsersDonation = function (user_name, donateAmount, successCB, failedCB) {

            var url = 'http://localhost/kick_last/TechProject/techProject/server/api.php';
            var data = {
                action: 'updateUsersDonation',
                user_name: user_name,
                donate_amount: donateAmount

            };

            this.sendToServer(data, url,
                function (response) {
                    if (!response.err) {
                        // toastr.success(response.data.response);
                        //alert('sadasdasdasdasdasdsadsadasd');
                        console.log(response);
                        successCB(response);
                        //console.log("Service");
                    }
                },
                function (e) {
                    //alert('Server error - please try again later');
                    //console.log(e);
                    //alert('Server error - please try again later');
                }
            );
        };

        this.UpdateProject = function (projectName, goal, desc, successCB, failedCB) {

            var url = 'http://localhost/kick_last/TechProject/techProject/server/api.php';
            var data = {
                action: 'UpdateProject',
                project_name: projectName,
                goal: goal,
                desc: desc
            };

            this.sendToServer(data, url,
                function (response) {
                    if (!response.err) {
                        // toastr.success(response.data.response);
                        //alert('sadasdasdasdasdasdsadsadasd');
                        console.log(response);
                        successCB(response);
                        //console.log("Service");
                    }
                },
                function (e) {
                    //alert('Server error - please try again later');
                    //console.log(e);
                    //alert('Server error - please try again later');
                }
            );
        };

        this.getDonators = function (successCB, failedCB) {
            var url = 'http://localhost/kick_last/TechProject/techProject/server/api.php';
            console.log(url);
            var data = {
                action: 'allDonators'
            };

            this.sendToServer(data, url,
                function (response) {

                    if (!response.err) {
                        // toastr.success(response.data.response);
                        console.log(response);
                        successCB(response);
                        // console.log("Service");
                    }
                },
                function (e) {
                    //alert('Server error - please try again later');
                    //console.log(e);
                    //alert('Server error - please try again later');
                }
            );
        };

        this.updateDonator = function (user_name, successCB, failedCB) {

            var url = 'http://localhost/kick_last/TechProject/techProject/server/api.php';
            console.log(url);
            var data = {
                action: 'updateDonator',
                user_name: user_name
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
                    //alert('Server error - please try again later');
                    //console.log(e);
                    //alert('Server error - please try again later');
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
