// make lodash an injectable service
angular.module('lodash', [])  
.factory('_', ['$window', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
}]);
