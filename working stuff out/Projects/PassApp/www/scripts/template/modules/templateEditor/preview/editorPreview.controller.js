(function () {
    'use strict';

    angular
        .module('basicapp.templateEditor')
        .controller('editTemplatePreviewCtrl', editTemplatePreviewCtrl);

    editTemplatePreviewCtrl.$inject = [
                                '$state',
                                
                                'TemplateEditorSrvc'
                                ];

    /* @ngInject */
    function editTemplatePreviewCtrl(    
                                $state,
                                
                                TemplateEditorSrvc
                                )       {
                                     
        var vm = angular.extend(this, {
            //nothing - just a template.
        });
        
        //angular.copy(TemplateEditorSrvc.rtnTemplate(), vm.edittedTemplate);
        //CONTROLLER HERE
        vm.edittedTemplate = {};
        vm.edittedTemplate.name = TemplateEditorSrvc.getName();
        vm.edittedTemplate.attributes = TemplateEditorSrvc.getAttributes();
        vm.edittedTemplate.style = TemplateEditorSrvc.getStyle(); 
        
        vm.finish = function() {
            TemplateEditorSrvc.finish();
            TemplateEditorSrvc.reset();
        }
        vm.previous = function() {
            TemplateEditorSrvc.goBack($state.current.name);
        }       
    }
})();