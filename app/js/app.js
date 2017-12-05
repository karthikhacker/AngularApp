var myApp = angular.module('myApp',['ngRoute','firebase','ngFileUpload','ngAnimate']);

//run method 
myApp.run(['$rootScope','$location',function($rootScope,$location){
  $rootScope.$on('$routeChangeError',function(event,next,previous,error){
     if(error == 'AUTH_REQUIRED'){
       $rootScope.message = "Sorry you must login to access this page";
       $location.path('/login');
     }
  })
}]);

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
    controller:'RecipeController',
    resolve:{
      currentAuth:function(Authentication){
        return Authentication.requireAuth();
      }
    }
  })
  .when('/details/:rId',{
     templateUrl:'views/details.html',
     controller:'RecipeController'
  })
  .when('/manage',{
     templateUrl:'views/manage.html',
     controller:'RecipeController',
     resolve:{
       currentAuth:function(Authentication){
         return Authentication.requireAuth();
       }
     }
  })
  .otherwise({
    redirectTo:'recipes'
  });  
  
}]);

