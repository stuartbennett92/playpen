(function () {
    'use strict';

    angular
        .module('basicapp.template')
        .controller('createTemplateAttributesCtrl', createTemplateAttributesCtrl);

    createTemplateAttributesCtrl.$inject = [
                                '$state',
                                'TemplateCreatorSrvc'
                                ];

    /* @ngInject */
    function createTemplateAttributesCtrl(    
                                $state,
                                TemplateCreatorSrvc
                                )       {
                                     
        var vm = angular.extend(this, {
            //nothing - just a template.
        });
        
        //CONTROLLER HERE
        
        vm.reset = function() {
            vm.attribute = {'name': '', 'desc': ''};
        }
        vm.updateList = function () {
            vm.attributeList = TemplateCreatorSrvc.attributes;            
        }
               
        vm.addAttribute = function() {
            TemplateCreatorSrvc.addAttribute(vm.attribute);
            vm.reset();
            vm.updateList();
        }
        vm.cullAttributeByName = function(attribute) {
            TemplateCreatorSrvc.cullAttribute(attribute);
            vm.updateList();
        }
                        
        vm.next = function() {
            TemplateCreatorSrvc.moveOn($state.current.name);
        }
        vm.previous = function() {
            TemplateCreatorSrvc.goBack($state.current.name);
        }
        
        vm.reset();
        vm.updateList();

    }
})();