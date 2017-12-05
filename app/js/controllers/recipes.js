myApp.controller('RecipeController',['$scope','$rootScope','$firebaseArray','$routeParams','$location','$firebaseObject','$firebaseAuth',function($scope,$rootScope,$firebaseArray,$routeParams,$location,$firebaseObject,$firebaseAuth){

    //put inside users table 
    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(authUser){
      if(authUser){
     var recipeRef = ref.child("users").child(authUser.uid).child("recipes");
     var recipeInfo = $firebaseArray(recipeRef);

     //No of recipes 
      recipeInfo.$loaded().then(function(data){
         $rootScope.howManyRecipes = recipeInfo.length;
      });

     //update no of recipe  data
     recipeInfo.$watch(function(){
       $rootScope.howManyRecipes = recipeInfo.length;
     }); 
    //Add recipe 
    $scope.addRecipe = function(){
       recipeInfo.$add({
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
           $location.path('/recipes');
        }).catch(function(error){
            console.log(error);
       });

    };

    //Get data from firebase 
    $scope.recipes = recipeInfo;
   
   //Details page  
   var id = $routeParams.rId;
 
   var dRef = ref.child("users").child(authUser.uid).child("recipes/"+id);
   $scope.recipe = $firebaseObject(dRef);
   //console.log($scope.recipe);
   
  //Manage 
 
  $scope.manage = recipeInfo;
  //console.log($scope.manage);

  //Delete Recipe 
  $scope.deleteRecipe = function(key){

    $scope.manage.$remove(key).then(function(ref){
       console.log("Deleted");
      $scope.msg = "Recipe deleted";
   }).catch(function(error){
       console.log(error);
    });
 };

  

  //Edit Recipe 
     $scope.editRecipe = function(info){
     $scope.manageedit = info;

  }

 //Update recipe
 $scope.updateRecipe = function(id){
   //console.log(id);
   var EditRef = ref.child('users').child(authUser.uid).child('recipes/'+id);
   EditRef.update({
     name:$scope.manageedit.name,
     image:$scope.manageedit.image,
     ingredients:$scope.manageedit.ingredients,
     making:$scope.manageedit.making
   }).then(function(){
      console.log("updated");
   }).catch(function(error){
       console.log(error);
   });
   $scope.msg = "Recipe updated successfully.";
 };
      }
    });//onStateChanged

    

}]);