"use strict()";

var recipeAPI = "./com/home/db/recipes.json";

function HomeCtrl($http, $ionicLoading) {
  console.log("HomeCtrl");

  var home = this;

  home.recipe = {
    name: "Grilled Cheese",
    level: 1,
    prepTime: 5,
    cookTime: 10,
    ingredients: [
        {
          name: "Sliced Bread - 2 Slices",
          img: ""
        },
        {
          name: "Butter - 1 Tablespoon",
          img:""
        },
        {
          name: "Cheese Slices - 1 Slice",
          img:""
        }
      ],
    tools: [
        {
          name: "Butter Knife",
          img: ""
        },
        {
          name: "Non-stick Frying Pan",
          img: ""
        },
        {
          name: "Spatula",
          img: ""
        }
      ],

    steps: [
        {
          name: "Step One",
          number: 1,
          description: "Preheat frying pan over medium heat.",
          img: "",
          timer: false
        },
        {
          name: "Step Two",
          number: 2,
          description: "Generously butter one side of both slices of bread.",
          img: "",
          timer: false
        },
        {
          name: "Step Three",
          number: 3,
          description: "Place one slice of bread butter side down on the frying pan. Place slice of cheese on top of the bread. Add the second buttered slice of bread with the buttered side up.",
          img: "",
          timer: false
        },
        {
          name: "Step Four",
          number: 4,
          description: "Allow sandwich to grill until bottom reaches desired browning - typically golden browned. Once browned, use spatula to flip sandwich to grill the other side. Allow sandwich to grill until cheese is melted and the bottom has reached desired browning.",
          img: "",
          timer: false
        },
        {
          name: "Step Five",
          number: 5,
          description: "Use spatula to remove sandwich from pan and place onto plate. Remove pan from the burner and be sure to turn off the stovetop. Cut sandwich in half and enjoy by itself or with a dip such as ketchup.",
          img: "",
          timer: false
        }
      ],
      variations: "Try using different kinds of bread and different cheeses next time you make grilled cheese!"
  }

  home.fetchRecipe = function (level) {
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-energized"></ion-spinner><br>Analyzing your possible future',
      animation: 'fade-in'
    });
    $http.get(analyzerAPI)
      .then(
        function (response) {
          console.log(response.data);

          $ionicLoading.hide();
        },
        function (err) {
          $ionicLoading.hide();
          alert("Too vague Idea, no keywords found...");
          return console.log(err);
        }
      );
  };
}
