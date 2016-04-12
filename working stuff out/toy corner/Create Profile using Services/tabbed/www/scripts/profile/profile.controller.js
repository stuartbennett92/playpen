(function () {
    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['ProfileService'];

    /* @ngInject */
    function ProfileController(ProfileService) { 
        var vm = angular.extend(this, {
            
            // no attributes.

        });
        
        vm.profileModel = {};

        //set profile attributes
        vm.chats = function chats(){
            return ChatService.all();
        }
        //ProfileService.setName('helloo');
        
        
        //confirm
        vm.confirm = function confirm(){
        
            ProfileService.setName(vm.profileModel.name);
            ProfileService.setSite(vm.profileModel.site);
            ProfileService.setAbout(vm.profileModel.about);
            ProfileService.save();    
        }
        
        
        //cancel
        
    }
})();