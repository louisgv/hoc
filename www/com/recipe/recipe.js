"use strict()";

function RecipeCtrl($state, $stateParams, DatabaseService) {
  console.log("recipeCtrl");

  var recipe = this;

  var fields = ['ingredients', 'tools', 'steps'];

  recipe.show = null;

  recipe.cardSwipedLeft = function (index) {
    // recipe.recipe.steps.push(recipe.recipe.steps[index]);
    // recipe.recipe.steps.push();
    console.log("SWIPED LEFT");

    // var newCard = recipe.content[fields[fieldIndex]].splice(index, 1)[0];
    var newCard = recipe.content[fields[recipe.show]].splice(index, 1)[0];

    newCard.id = Math.random();

    console.log(newCard);

    recipe.content[fields[recipe.show]].unshift(angular.extend({}, newCard));
  }

  // recipe.recipe.steps.push(recipe.recipe.steps.splice(index, 1)[0]);
  recipe.cardSwipedRight = function (index) {
    console.log("SWIPED RIGHT");
    // console.log(recipe.recipe.steps);

    // console.log(recipe.content);
    console.log(index);

    console.log(recipe.content[fields[recipe.show]].splice(index, 1));

    // console.log(index);

    // console.log(fieldIndex);

    // if (!recipe.content[fields[fieldIndex]]){
    //   return console.log(recipe.content[fields[fieldIndex]]);
    // }

    if (recipe.content[fields[recipe.show]].length === 1 && recipe.show < 2){
      ++recipe.show;
    }
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
