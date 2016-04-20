(function () {
    'use strict';

    angular
        .module('basicapp.template')
        .controller('createTemplatePreviewCtrl', createTemplatePreviewCtrl);

    createTemplatePreviewCtrl.$inject = [
                                '$state',
                                
                                'TemplateCreatorSrvc'
                                ];

    /* @ngInject */
    function createTemplatePreviewCtrl(    
                                $state,
                                
                                TemplateCreatorSrvc
                                )       {
                                     
        var vm = angular.extend(this, {
            //nothing - just a template.
        });
        
        vm.createdTemplate = TemplateCreatorSrvc;
        
        //CONTROLLER HERE
        vm.finish = function() {
            TemplateCreatorSrvc.finish();
            TemplateCreatorSrvc.reset();
        }
        vm.previous = function() {
            TemplateCreatorSrvc.goBack($state.current.name);
        }       
    }
})();