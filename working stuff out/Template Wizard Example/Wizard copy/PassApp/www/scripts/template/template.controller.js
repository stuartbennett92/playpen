(function () {
    'use strict';

    angular
        .module('basicapp.template')
        .controller('TemplateController', TemplateController);

    TemplateController.$inject = [
                                '$state',
                                'TemplateService'
                                ];

    /* @ngInject */
    function TemplateController(    
                                $state,
                                TemplateService
                                )       {
                                     
        var vm = angular.extend(this, {
            //nothing - just a template.
        });
        
        vm.listOfTemplates = TemplateService;
        //TemplateService.returnTemplate();
        
        vm.startTemplateWizard = function() {
            
            $state.go('tWizname');
            console.log("starting template wizard");
            // when we start the wizard empty the template's template within the parameterPasser
            parameterPasser.clear('paramTempTemplate');
        }
        
        vm.startTemplateCreator = function() {
            $state.go('createTemplateName');
        }
        
        vm.tListEmpty = function () {
            
            if (TemplateService.length === 0){
                return true;
            }
            return false;
        }
    }
})();