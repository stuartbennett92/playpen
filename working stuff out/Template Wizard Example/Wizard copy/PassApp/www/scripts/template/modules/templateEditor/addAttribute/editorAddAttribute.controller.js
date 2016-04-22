(function () {
    'use strict';

    angular
        .module('basicapp.templateEditor')
        .controller('editTemplateAttributesCtrl', editTemplateAttributesCtrl);

    editTemplateAttributesCtrl.$inject = [
                                '$state',
                                'TemplateEditorSrvc'
                                ];

    /* @ngInject */
    function editTemplateAttributesCtrl(    
                                $state,
                                TemplateEditorSrvc
                                )       {
                                     
        var vm = angular.extend(this, {
            //nothing - just a template.
        });
        
        //CONTROLLER HERE
        
        vm.reset = function() {
            vm.attribute = {'name': '', 'desc': ''};
        }
        vm.updateList = function () {
            vm.attributeList = TemplateEditorSrvc.getAttributes();            
        }
               
        vm.addAttribute = function() {
            TemplateEditorSrvc.addAttribute(vm.attribute);
            vm.reset();
            vm.updateList();
        }
        vm.cullAttributeByName = function(attribute) {
            TemplateEditorSrvc.cullAttribute(attribute);
            vm.updateList();
        }
                        
        vm.next = function() {
            TemplateEditorSrvc.moveOn($state.current.name);
        }
        vm.previous = function() {
            TemplateEditorSrvc.goBack($state.current.name);
        }
        
        vm.reset();
        vm.updateList();

    }
})();