(function () {
    'use strict';

    angular
        .module('app.chat')
        .controller('ListController', ListController);

    ListController.$inject = ['ChatService'];

    /* @ngInject */
    function ListController(ChatService) { 
        var vm = angular.extend(this, {
            
            // no attributes.          

        });


        vm.chats = function chats(){
            return ChatService.all();
        }

        vm.remove = function remove(chat){
            ChatService.remove(chat);
        }



    }
})();