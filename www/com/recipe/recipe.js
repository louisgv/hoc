"use strict()";

function RecipeCtrl($state, $stateParams, $ionicScrollDelegate, DatabaseService) {
  console.log("recipeCtrl");

  var recipe = this;

  var fields = ['ingredients', 'tools', 'steps'];

  recipe.show = null;

  recipe.nextStep = 0;

  recipe.stateChanged = function (checked) {
    if(checked) {
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

  recipe.finish = function () {
    if(DatabaseService.user.finished[recipe.content.name]) {
      DatabaseService.user.exp += 100;
    } else {
      DatabaseService.user.finished[recipe.content.name] = true;
      DatabaseService.user.exp += 300 * recipe.content.level;
    }
    if(DatabaseService.user.exp >= DatabaseService.user.level * 900) {
      ++DatabaseService.user.level;
    }
    DatabaseService.user.$save()
      .then(function (ref) {
        ref.key() === DatabaseService.user; // true
      }, function (error) {
        console.log("Error:", error);
      });

    $state.go('home');
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
