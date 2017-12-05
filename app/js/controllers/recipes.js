myApp.controller('RecipeController',['$scope','$rootScope','$firebaseArray','$routeParams','$location','$firebaseObject','$firebaseAuth',function($scope,$rootScope,$firebaseArray,$routeParams,$location,$firebaseObject,$firebaseAuth){

    //put inside users table 
    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(authUser){
      if(authUser){
     var recipeRef = ref.child("users").child(authUser.uid).child("recipes");
     var recipeInfo = $firebaseArray(recipeRef);


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
           $location.path('./recipes');
        }).catch(function(error){
            console.log(error);
       });

    };

    //Get data from firebase 
    $scope.recipes = recipeInfo;
   
   //Details page  
   var id = $routeParams.rId;
   var dRef = ref.child("users").child(authUser.uid).child("recipes").child(id);
   $scope.recipe = $firebaseObject(dRef);
   console.log($scope.recipe);
   
  //Manage 
 // var ref = firebase.database().ref('recipes');
 // $scope.manage = $firebaseArray(ref);
    //console.log($scope.manage);

  //Delete Recipe 
 // $scope.deleteRecipe = function(key){
 //   var ref = firebase.database().ref("recipes");
   // $scope.manage.$remove(key).then(function(ref){
      // console.log("Deleted");
     //  $scope.message = "Recipe deleted";
   // }).catch(function(error){
    //   console.log(error);
   // });
 // };

  

  //Edit Recipe 
 // $scope.editRecipe = function(info){
    // var ref = firebase.database().ref('recipes');
    // $scope.manageedit = info;
//
 // }

 //Update recipe
 //$scope.updateRecipe = function(id){
  // console.log(id);
  // var ref = firebase.database().ref('recipes/'+id);
   //ref.update({
    // name:$scope.manageedit.name,
    // image:$scope.manageedit.image,
    // ingredients:$scope.manageedit.ingredients,
    // making:$scope.manageedit.making
  // }).then(function(){
    //  console.log("Updated");

 //  }).catch(function(error){
      //console.log(error);

  // });
   // $scope.msg = "Updated recipe";
 //}
      }
    });//onStateChanged

    

}]);