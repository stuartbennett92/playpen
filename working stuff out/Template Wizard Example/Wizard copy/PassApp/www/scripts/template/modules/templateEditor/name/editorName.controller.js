(function () {
    'use strict';

    angular
        .module('basicapp.templateEditor')
        .controller('editTemplateNameCtrl', editTemplateNameCtrl);

    editTemplateNameCtrl.$inject = [
                                '$state',
                                'TemplateEditorSrvc'
                                ];

    /* @ngInject */
    function editTemplateNameCtrl(    
                                $state,
                                TemplateEditorSrvc
                                )       {
                                     
        var vm = angular.extend(this, {
            //nothing - just a template.
        });
        
        //CONTROLLER HERE
        vm.name = TemplateEditorSrvc.getName();
        
        
        vm.next = function() {
            TemplateEditorSrvc.setName(vm.name);
            TemplateEditorSrvc.moveOn($state.current.name);
        }          
    }
})();