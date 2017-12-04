var myApp = angular.module('myApp',['ngRoute','firebase','ngFileUpload']);

myApp.config(['$routeProvider',function($routeProvider){
  $routeProvider
  .when('/login',{
  	templateUrl:'views/login.html',
    controller:'RegistrationController'
  })
  .when('/signup',{
  	templateUrl:'views/signup.html',
    controller:'RegistrationController'
  })
  .when('/addrecipes',{
    templateUrl:'views/addrecipes.html',
    controller:'RecipeController'
  })
  .when('/recipes',{
    templateUrl:'views/recipes.html',
    controller:'RecipeController'
  })
  .when('/details/:rId',{
     templateUrl:'views/details.html',
     controller:'RecipeController'
  })
  .when('/manage',{
     templateUrl:'views/manage.html',
     controller:'RecipeController'
  })
  .otherwise({
    redirectTo:'/recipes'
  });  
  
}]);

