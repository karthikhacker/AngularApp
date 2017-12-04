myApp.controller('RecipeController',['$scope','$firebaseArray','$routeParams','$location','$firebaseObject',function($scope,$firebaseArray,$routeParams,$location,$firebaseObject){
      
    //Add recipe 
    $scope.addRecipe = function(){
       var ref = firebase.database().ref('recipes');
       var recipes = $firebaseArray(ref);
       recipes.$add({
            name: $scope.recipename,
            image:$scope.recipeimage,
            ingredients:$scope.recipeingredients,
            making:$scope.recipemaking
       }).then(function(ref){
           console.log(ref);
      $location.path("/recipes");
       }).catch(function(error){
            console.log(error);
       });
    };

    //Get data from firebase 
    
      var ref = firebase.database().ref('recipes');
      $scope.recipes = $firebaseArray(ref);
   
   //Details page  
   var id = $routeParams.rId;
   var ref = firebase.database().ref("recipes/"+id);
   $scope.recipe = $firebaseObject(ref);
   console.log($scope.recipes);
   
 
}]);