(function () {
    'use strict';

    angular
        .module('app.dash')
        .controller('DashController', DashController);

    DashController.$inject = [];

    /* @ngInject */
    function DashController() { 
        var vm = angular.extend(this, {
            //nothing - just a template.
        });
    }
})();