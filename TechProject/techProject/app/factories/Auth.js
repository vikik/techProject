angular.module('wepappApp')
  .factory('Auth', function(){



    var user={
      name: "guest"

    };

    return{
      setUser : function(aUser){
        user = aUser;
      },
      isLoggedIn : function(){


        //TODO check if user is logged in with cookies

        return(user)? user : false;
      },
      getUserName: function(){
        return user['name'];
      }
    }
  });

Auth.authorize = function (securityFlag) {
  return !securityFlag || (
    user !== null &&
    (securityFlag === true || user.roles.indexOf(securityFlag) !== -1)
    );
};
