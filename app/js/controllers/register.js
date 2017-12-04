myApp.controller('RegistrationController',['$scope','$firebaseAuth','Authentication',function($scope,$firebaseAuth,Authentication){
  //login
  $scope.login = function(){
  	console.log("login");
  	Authentication.login($scope.user);
  };

  //signup 
  $scope.signup = function(){
  	console.log("Signup");
  	Authentication.signup($scope.user);
  },

  // lougout 
  $scope.logout = function(){
  	Authentication.logout();
  }

}]);