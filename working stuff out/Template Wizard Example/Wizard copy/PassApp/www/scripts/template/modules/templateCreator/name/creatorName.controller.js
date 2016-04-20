(function () {
    'use strict';

    angular
        .module('basicapp.template')
        .controller('createTemplateNameCtrl', createTemplateNameCtrl);

    createTemplateNameCtrl.$inject = [
                                '$state',
                                'TemplateCreatorSrvc'
                                ];

    /* @ngInject */
    function createTemplateNameCtrl(    
                                $state,
                                TemplateCreatorSrvc
                                )       {
                                     
        var vm = angular.extend(this, {
            //nothing - just a template.
        });
        
        //CONTROLLER HERE
        vm.name = TemplateCreatorSrvc.name;
        
    
        vm.next = function() {
            TemplateCreatorSrvc.setName(vm.name);
            TemplateCreatorSrvc.moveOn($state.current.name);
        }           
    }
})();