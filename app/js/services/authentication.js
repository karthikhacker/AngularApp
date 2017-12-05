myApp.factory('Authentication',['$rootScope','$firebaseAuth','$location','$firebaseObject',function($rootScope,$firebaseAuth,$location,$firebaseObject){
  
  
  //firebase ref 
  var ref = firebase.database().ref();
  //firebase auth
  var auth = $firebaseAuth();
  //object 
  var obj
  //loggedin user status 
  auth.$onAuthStateChanged(function(authUser){
     if(authUser){
     	var userRef = ref.child('users').child(authUser.uid);
     	var userObj = $firebaseObject(userRef);
     	$rootScope.currentUser = userObj;
     }else{
     	$rootScope.currentUser = "";
     }
  });
  //register, login and logout 
  obj = {
    login:function(user){
      auth.$signInWithEmailAndPassword(user.email,user.password).
      then(function(regUser){
      	console.log("signed in as",regUser.uid);
      	//go to recipes page
      	$location.path('/recipes');
      }).catch(function(error){
         $rootScope.message = error.message;
      });
    },//login

    signup:function(user){
      auth.$createUserWithEmailAndPassword(user.email,user.password).
      then(function(regUser){
      	console.log("singup successfull",regUser.uid);
      	//push user to db 
      	var ref = firebase.database().ref();
      	ref.child('users').child(regUser.uid).set({
          date:firebase.database.ServerValue.TIMESTAMP,
          firstname:user.firstname,
          lastname:user.lastname,
          email:user.email
      	});
      	//log the user in automatically 
      	obj.login(user);
      }).catch(function(error){
          $rootScope.message = error.message;
      });
    },//signup

    logout:function(){
       return auth.$signOut();
    },//logout

    requireAuth:function(){
      return auth.$requireSignIn();
    }
  };
  return obj;
}]);

console.log("auth");