(function () {
    'use strict';

    angular
        .module('basicapp.templateEditor')
        .controller('editTemplateAttributeDescriptionsCtrl', editTemplateAttributeDescriptionsCtrl);

    editTemplateAttributeDescriptionsCtrl.$inject = [
                                '$scope',
                                '$state',
                                '$ionicPopup',
                                'TemplateEditorSrvc'
                                ];

    /* @ngInject */
    function editTemplateAttributeDescriptionsCtrl(
                                $scope,    
                                $state,
                                $ionicPopup,
                                TemplateEditorSrvc
                                )       {
                                     
        var vm = angular.extend(this, {
            //nothing - just a template.
        });
        
        //CONTROLLER HERE
        vm.updateList = function () {
            vm.attributeList = TemplateEditorSrvc.getAttributes();            
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
            TemplateEditorSrvc.moveOn($state.current.name);
        }
        vm.previous = function() {
            TemplateEditorSrvc.goBack($state.current.name);
        }      
        
        vm.descDone();
        vm.updateList(); 

    }
})();