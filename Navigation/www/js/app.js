var app = angular.module('ionicApp', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider.state('home', {
    url: '/',
    template: 
    <body>
        <ion-tabs class="tabs-positive">
            <ion-tab icon="ion-home" ui-sref="home">
                <ion-nav-view name="home"></ion-nav-view>
            </ion-tab>
            <ion-tab icon="ion-help" ui-sref="help">
                <ion-nav-view name="help"></ion-nav-view>
            </ion-tab>
        </ion-tabs>
    </body>
  })
  
  $stateProvider.state('home', {
  url: '/home',
  views: {
    home: {
      templateUrl: 'home.html'
    }
  }
})

$stateProvider.state('help', {
  url: '/help',
  views: {
    help: {
      templateUrl: 'help.html'
    }
  }
})

})

