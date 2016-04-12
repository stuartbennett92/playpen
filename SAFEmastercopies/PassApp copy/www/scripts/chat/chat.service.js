(function () {
    'use strict';

    angular
        .module('app.chat')
        .factory('ChatService', ChatService);

    ChatService.$inject = [];

    /* @ngInject */
    function ChatService() {


        var service = {
               
             // Some fake testing data
              chats: [{
                id: 0,
                name: 'Ben Sparrow',
                lastText: 'You on your way?',
                face: 'img/ben.png'
              }, {
                id: 1,
                name: 'Max Lynx',
                lastText: 'Hey, it\'s me',
                face: 'img/max.png'
              }, {
                id: 2,
                name: 'Adam Bradleyson',
                lastText: 'I should buy a boat',
                face: 'img/adam.jpg'
              }, {
                id: 3,
                name: 'Perry Governor',
                lastText: 'Look at my mukluks!',
                face: 'img/perry.png'
              }, {
                id: 4,
                name: 'Mike Harrington',
                lastText: 'This is wicked good ice cream.',
                face: 'img/mike.png'
              }]
            
        };

 
        service.all = function() {
          return service.chats;
        };

        service.remove = function(chat) {
          service.chats.splice(service.chats.indexOf(chat), 1);
        };

        service.get = function(chatId) {
          for (var i = 0; i < service.chats.length; i++) {
            if (service.chats[i].id === parseInt(chatId)) {
              return service.chats[i];
            }
          }
          return null;
        }

        return service;
    }
    
})();