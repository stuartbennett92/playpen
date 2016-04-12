(function () {
    'use strict';

    angular
        .module('app.chat')
        .controller('DetailController', DetailController);

    DetailController.$inject = ['$stateParams', 'ChatService'];

    /* @ngInject */
    function DetailController($stateParams, ChatService) { 
        var vm = angular.extend(this, {
            // no attributes
            
        });
        
        
        vm.chat = function chat(){
            return ChatService.get($stateParams.chatId);
        }
        
    }
})();