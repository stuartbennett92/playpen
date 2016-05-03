
    var app = angular.module('myApp', ['ionic']);
    app.controller('templatesController', ['$scope', '$http', function($scope,$http) {
      $http.get('json/template.json')
      .success(function (response) 
      {
       $scope.templates = response;
      });
    }]);