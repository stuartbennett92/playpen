// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
    'ionic', 
    'app.tabs',
    'app.dash', 
    'app.chat',
    'app.account',
    
    
    
    // wizard dependencies
    'ui.thumbnail',
    'restlet.sdk',
    'basicapp.wizard',
    'basicapp.wizard.train',
    'basicapp.wizard.train.where-are-you',
    'basicapp.locations',
    'basicapp.journey',
    'basicapp.tocs',
    'basicapp.trains',
    'basicapp.common',
    'ngCordova',
    
    'basicapp.template',
    'basicapp.template.wizard'
])


.value('_', window._)
.value('dateFormat', window.dateFormat)

.run(function($ionicPlatform, $rootScope, isambard) {

    
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        console.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
    });
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        console.log('$stateChangeError - fired when an error occurs during transition.');
        console.log(arguments);
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        console.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
    });
    // $rootScope.$on('$viewContentLoading',function(event, viewConfig){
    //   // runs on individual scopes, so putting it in "run" doesn't work.
    //   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
    // });
    $rootScope.$on('$viewContentLoaded', function (event) {
        console.log('$viewContentLoaded - fired after dom rendered', event);
    });
    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
        console.log(unfoundState, fromState, fromParams);
    });
    
    
    
    
    
    
    $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
    
    
   isambard.configureHTTP_BASICAuthentication("", "");
    
    
    
})

.config(function($stateProvider, $urlRouterProvider, $compileProvider, $sceDelegateProvider) {
    
    
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);

    // WE ARE TRUSTING ALL URLS PROVIDED AS DATA
    $sceDelegateProvider.resourceUrlWhitelist(['**']);
    

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

});
