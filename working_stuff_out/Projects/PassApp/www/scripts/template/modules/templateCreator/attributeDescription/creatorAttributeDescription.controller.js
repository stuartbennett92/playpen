(function () {
    'use strict';

    angular
        .module('basicapp.templateCreator')
        .controller('createTemplateAttributeDescriptionsCtrl', createTemplateAttributeDescriptionsCtrl);

    createTemplateAttributeDescriptionsCtrl.$inject = [
                                '$scope',
                                '$state',
                                '$ionicPopup',
                                'TemplateCreatorSrvc'
                                ];

    /* @ngInject */
    function createTemplateAttributeDescriptionsCtrl(
                                $scope,    
                                $state,
                                $ionicPopup,
                                TemplateCreatorSrvc
                                )       {
                                     
        var vm = angular.extend(this, {
            //nothing - just a template.
        });
        
        //CONTROLLER HERE
        vm.updateList = function () {
            vm.attributeList = TemplateCreatorSrvc.attributes;            
        }
        
        
        vm.descDone = function () {
            vm.expandedAttribute = '';
            vm.descHistory = ''; 
        }
        
        vm.descCancel = function (attribute) {
            attribute.desc = vm.descHistory;
            vm.expandedAttribute = '';  
        }        
        
        vm.setExpand = function(attribute) {
            angular.copy(attribute.desc, vm.descHistory);
            vm.expandedAttribute = attribute.name;
        }
        
        vm.attributeExpand= function (attName) {
            return (attName == vm.expandedAttribute);
        }
        
        vm.next = function() {
            TemplateCreatorSrvc.moveOn($state.current.name);
        }
        vm.previous = function() {
            TemplateCreatorSrvc.goBack($state.current.name);
        }      
        
        vm.descDone();
        vm.updateList(); 

    }
})();