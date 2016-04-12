/*
(function() {
	'use strict';

	angular
		.module('basicapp.common', ['ionic']);
})();
*/

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'basicapp.home'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
      
      //when the app is ready, take the view to home.
      $timeout(function() {
            $state.go('app.home');
        }, 5000);
      
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
/*

// make lodash an injectable service
angular.module('lodash', [])  
.factory('_', ['$window', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
}]);


angular.module('starter.controllers',['lodash'])
*/
