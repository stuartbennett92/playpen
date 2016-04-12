// make lodash an injectable service
angular.module('date.format', [])  
.factory('dateFormat', ['$window', function($window) {
    return $window.dateFormat; // assumes underscore has already been loaded on the page
}]);
