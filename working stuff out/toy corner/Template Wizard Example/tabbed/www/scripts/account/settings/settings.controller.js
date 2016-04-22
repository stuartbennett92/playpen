(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = [];

    /* @ngInject */
    function SettingsController() { 
        var vm = angular.extend(this, {
            enableFriends:true
        });
    }
})();