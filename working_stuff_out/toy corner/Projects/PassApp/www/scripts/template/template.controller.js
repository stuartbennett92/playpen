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
        
        vm.startTemplateCreator = function() {
            $state.go('createTemplateName');
        }
        
        vm.tListEmpty = function () {
            
            if (TemplateService.length === 0){
                return true;
            } else {
            return false;
            }
        }
        
        vm.clickTemplate = function (template) {
            TemplateService.select(template.name);
            $state.go('templateViewer')
        }
    }
})();