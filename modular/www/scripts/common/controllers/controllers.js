
//makes the _ underscore (lodash) service injectible.
//
// Example:
// .controller('myCtrl', ['$scope', '_', function($scope, _){
//  $scope.lodashTest = {
//    getText: function(){
//      var x = [1, 2, 3, 4];
//      var text = "";
//      _.each(x, function(x){ // '_' is the lodash service
//        text += x;
//      })
//      return text; // Returns '1234'
//    }
//  }
//}])
//
angular.module('starter.controllers',['lodash'])
