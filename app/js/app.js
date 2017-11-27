var myApp = angular.module('myApp',['ngRoute']);

myApp.config(['$routeProvider',function($routeProvider){
  $routeProvider
  .when('/view1',{
  	templateUrl:'views/view1.html'
  })
  .when('/view2',{
  	templateUrl:'views/view2.html'
  })
  .otherwise({
  	 redirectTo:'view1'
  })
}]);

console.log("hi");