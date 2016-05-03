(function () {
    'use strict';

    angular
        .module('basicapp.templateEditor')
        .controller('editTemplateStyleCtrl', editTemplateStyleCtrl);

    editTemplateStyleCtrl.$inject = [
                                '$state',
                                
                                'TemplateEditorSrvc'
                                ];

    /* @ngInject */
    function editTemplateStyleCtrl(    
                                $state,
                                
                                TemplateEditorSrvc
                                )       {
                                     
        var vm = angular.extend(this, {
            //nothing - just a template.
        });
        
        vm.updateStyle=  function() {
            vm.chartStyle = TemplateEditorSrvc.getStyle();   
        }
        
        vm.setStyle3 = function () {
            TemplateEditorSrvc.setStyle(3);
            vm.updateStyle();
        }
        vm.setStyle10 = function () {
            TemplateEditorSrvc.setStyle(10);
            vm.updateStyle();
        }
        
        //CONTROLLER HERE
        vm.next = function() {
            TemplateEditorSrvc.moveOn($state.current.name);
        }
        vm.previous = function() {
            TemplateEditorSrvc.goBack($state.current.name);
        }
        
        vm.updateStyle();
    }
})();