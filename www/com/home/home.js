"use strict()";

var recipesAPI = "./com/home/db/recipes.json";

function HomeCtrl($http, $state, $ionicLoading, $ionicPopup, DatabaseService) {
  console.log("HomeCtrl");

  var home = this;

  home.colors = ["button-positive", "button-royal", "button-balanced"];

  home.chooseRecipe = function (index) {

    // home.recipe = angular.copy(DatabaseService.recipes[index]);

    $state.go('recipe', {
      index: index
    });

    // home.recipe.steps = home.recipe.steps.reverse();
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
          home.user = DatabaseService.user;

          DatabaseService.recipes = response.data.recipe;
          $ionicLoading.hide();
        },
        function (err) {
          $ionicLoading.hide();
          alert("...YOLO...");
          return console.log(err);
        }
      );
  };

  if(!DatabaseService.recipes) {
    fetchRecipe();
  } else {
    console.log(DatabaseService.recipes);
    home.recipes = DatabaseService.recipes;
  }

  if(DatabaseService.user) {
    home.user = DatabaseService.user;
  }

  if(!DatabaseService.userName) {
    var promptPopup = $ionicPopup.prompt({
      title: 'Provide Your User Name'
    });

    promptPopup.then(function (res) {
      if(res) {
        console.log(res);
        DatabaseService.userName = res;
        home.user = DatabaseService.user = DatabaseService.newUser(res);
      } else {
        console.log('Please enter input');
      }
    });
  }
}
