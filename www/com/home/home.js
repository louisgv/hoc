"use strict()";

var recipesAPI = "./com/home/db/recipes.json";

function HomeCtrl($http, $ionicLoading) {
  console.log("HomeCtrl");

  var home = this;

  home.cardDestroyed = function (index) {
    var newCard = home.recipe.steps.splice(index, 1)[0];
    newCard.id = Math.random();
    // home.recipe.steps.push(angular.extend({}, newCard));
    home.recipe.steps.unshift(angular.extend({}, newCard));

    console.log(index);
  }

  home.cardSwipedLeft = function(index) {
    // home.recipe.steps.push(home.recipe.steps[index]);
    // home.recipe.steps.push();
  }

  // home.recipe.steps.push(home.recipe.steps.splice(index, 1)[0]);
  home.cardSwipedRight = function(index) {
    // console.log(home.recipe.steps);

  }

  home.chooseRecipe = function (index) {
    home.recipe = home.recipes[index];

  }

  var fetchRecipe = function () {
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-energized"></ion-spinner><br>Fetching Recipes',
      animation: 'fade-in'
    });
    $http.get(recipesAPI)
      .then(
        function (response) {
          console.log(response.data);

          home.recipes = response.data.recipe;

          $ionicLoading.hide();
        },
        function (err) {
          $ionicLoading.hide();
          alert("Too vague Idea, no keywords found...");
          return console.log(err);
        }
      );
  };

  fetchRecipe();
}
