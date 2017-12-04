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
           $scope.recipename = "";
           $scope.recipeimage = "";
           $scope.recipeingredients = "";
           $scope.recipemaking = "";
           $location.path('./recipes');
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
   //console.log($scope.recipes);
   
  //Manage 
  var ref = firebase.database().ref('recipes');
  $scope.manage = $firebaseArray(ref);
    //console.log($scope.manage);

  //Delete Recipe 
  $scope.deleteRecipe = function(key){
    var ref = firebase.database().ref("recipes");
    $scope.manage.$remove(key).then(function(ref){
       console.log("Deleted");
       $scope.message = "Recipe deleted";
    }).catch(function(error){
       console.log(error);
    });
  };

  

  //Edit Recipe 
  $scope.editRecipe = function(info){
     var ref = firebase.database().ref('recipes');
     $scope.manageedit = info;

  }

 //Update recipe
 $scope.updateRecipe = function(id){
   console.log(id);
   var ref = firebase.database().ref('recipes/'+id);
   ref.update({
     name:$scope.manageedit.name,
     image:$scope.manageedit.image,
     ingredients:$scope.manageedit.ingredients,
     making:$scope.manageedit.making
   }).then(function(){
      console.log("Updated");

   }).catch(function(error){
      console.log(error);

   });
    $scope.message = "Updated.";
 }

}]);