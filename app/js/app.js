var myApp = angular.module('myApp',['ngRoute']);

myApp.config(['$routeProvider',function($routeProvider){
  $routeProvider
  .when('/login',{
  	templateUrl:'views/login.html'
  })
  .when('/signup',{
  	templateUrl:'views/signup.html'
  })
  .otherwise({
  	 redirectTo:'login'
  })
}]);

console.log("hi");