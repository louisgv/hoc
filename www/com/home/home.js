"use strict()";

var recipesAPI = "./com/home/db/recipes.json";

function HomeCtrl($http, $ionicLoading) {
  console.log("HomeCtrl");

  var home = this;

  home.fetchRecipe = function (level) {
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-energized"></ion-spinner><br>Analyzing your possible future',
      animation: 'fade-in'
    });
    $http.get(recipesAPI)
      .then(
        function (response) {
          console.log(response.data);

          home.recipes = response.data.recipe;

          home.recipe = home.recipes[level];


          $ionicLoading.hide();
        },
        function (err) {
          $ionicLoading.hide();
          alert("Too vague Idea, no keywords found...");
          return console.log(err);
        }
      );
  };

  home.fetchRecipe(0);
}
