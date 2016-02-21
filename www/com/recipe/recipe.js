"use strict()";

function RecipeCtrl($scope, $state, $stateParams, $ionicScrollDelegate, $filter, DatabaseService) {
  console.log("recipeCtrl");

  var recipe = this;

  var fields = ['ingredients', 'tools', 'steps'];

  recipe.show = null;

  recipe.nextStep = 0;

  recipe.stateChanged = function (checked) {
    if(checked){
      recipe.nextStep++;
    } else {
      recipe.nextStep--;
    }
    // console.log(recipe.content[fields[recipe.show]][index]);
  }

  recipe.toNextStage = function () {
    recipe.nextStep = 0;
    ++recipe.show;
    $ionicScrollDelegate.scrollTop(true);
  }


  if(!DatabaseService.recipes || $stateParams.index == null) {
    console.log(DatabaseService.recipes);
    $state.go('home');
  } else {

    console.log($stateParams.index);
    console.log(DatabaseService.recipes);

    recipe.content = angular.copy(DatabaseService.recipes[$stateParams.index]);
    recipe.show = 0;
    console.log(recipe.content);
  }
}
