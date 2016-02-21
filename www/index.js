// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('app', [
    'ionic',
    // 'camera',
    // 'chart.js',
    'ionic.contrib.ui.tinderCards'
  ])
  .config(config)
  .run(run)
  .factory('DatabaseService', DatabaseServ)
  .controller('HomeCtrl', HomeCtrl)
  .controller('RecipeCtrl', RecipeCtrl)
  .directive('noScroll', function () {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attr) {
        $element.on('touchmove', function (e) {
          e.preventDefault();
        });
      }
    }
  });

function config($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // if none of the above states are matched, use this as the fallback
  console.log('config');
  $ionicConfigProvider.views.maxCache(0);

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'com/home/home.html',
      controller: 'HomeCtrl as home'
    })
    .state('recipe', {
      url: '/r',
      templateUrl: 'com/recipe/recipe.html',
      controller: 'RecipeCtrl as recipe',
      params: {
        index: null
      }
    });
  // .state('app.deal', {
  //   url: '/deallists/:dealId',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/playlist.html',
  //       controller: 'DealListCtrl'
  //     }
  //   }
  // });
}

function run($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    console.log('run');
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}
