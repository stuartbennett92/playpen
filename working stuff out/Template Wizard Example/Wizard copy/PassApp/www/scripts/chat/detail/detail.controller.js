(function () {
    'use strict';

    angular
        .module('app.chat')
        .controller('DetailController', DetailController);

    DetailController.$inject = [
        '$stateParams', 
        'ChatService', 
        'parameterPasser',
        'journeyService'
    ];

    /* @ngInject */
    function DetailController(
        $stateParams, 
         ChatService, 
         parameterPasser,
         journeyService
        ) { 
        var vm = angular.extend(this, {
            // no attributes
            
        });
        
        
        vm.chat = function chat(){
            
            var chat = ChatService.get($stateParams.chatId);
            
            
            var location = parameterPasser.get("location");
            var train = parameterPasser.get("train");
            var journey = parameterPasser.get("journey");
            
            if(!(location == undefined)){
                chat.location = location; 
                parameterPasser.clear("location");
            }
            if(!(train == undefined)){
                chat.train = train;  
                parameterPasser.clear("train");
            }
            if(!(journey == undefined)){
                chat.journey = journey;   
                parameterPasser.clear("journey");
            }            
            
            if(!(!journey == undefined) && !(location == undefined)){
                chat.nextStop = journeyService.getNextStop(location,journey);
            }
            return chat;
        }
        
        
        vm.createWizardSRef = function createWizardSRef(){
            
            var sref =  "wizard.train.where-are-you ";
            sref += "({ ";
            sref +=   "abort_state: ";
            sref +=                   "'";
            sref +=                       "tab.chat-detail ";
            sref +=                                         "({";
            sref +=                                          "\"chatId\": ";
            sref +=                                          $stateParams.chatId;
            sref +=                                         "})";
            
            sref +=                   "', ";
            
            sref +=   "completion_state: ";
            sref +=                   "'";
            sref +=                       "tab.chat-detail ";
            sref +=                                         "({";
            sref +=                                          "\"chatId\": ";            
            sref +=                                          $stateParams.chatId;
            sref +=                                         "})";    
            
            sref +=                   "',";
            
            sref +=   "result_name: ";
            sref +=                  "'result'";
            sref +=   "})";
            
            
            return sref;
        }
        
        
        

            
        
        
    }
})();