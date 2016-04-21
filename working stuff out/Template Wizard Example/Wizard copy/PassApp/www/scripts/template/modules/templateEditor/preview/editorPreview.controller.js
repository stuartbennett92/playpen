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
        
        vm.edittedTemplate = TemplateEditorSrvc;
        
        //CONTROLLER HERE
        vm.finish = function() {
            TemplateEditorSrvc.finish();
            TemplateEditorSrvc.reset();
        }
        vm.previous = function() {
            TemplateEditorSrvc.goBack($state.current.name);
        }       
    }
})();