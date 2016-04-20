(function () {
    'use strict';

    angular
        .module('basicapp.template')
        .controller('createTemplateStyleCtrl', createTemplateStyleCtrl);

    createTemplateStyleCtrl.$inject = [
                                '$state',
                                
                                'TemplateCreatorSrvc'
                                ];

    /* @ngInject */
    function createTemplateStyleCtrl(    
                                $state,
                                
                                TemplateCreatorSrvc
                                )       {
                                     
        var vm = angular.extend(this, {
            //nothing - just a template.
        });
        
        vm.updateStyle=  function() {
            vm.chartStyle = TemplateCreatorSrvc.style;   
        }
        
        vm.setStyle3 = function () {
            TemplateCreatorSrvc.style = 3;
            vm.updateStyle();
        }
        vm.setStyle10 = function () {
            TemplateCreatorSrvc.style = 10;
            vm.updateStyle();
        }
        
        //CONTROLLER HERE
        vm.next = function() {
            TemplateCreatorSrvc.moveOn($state.current.name);
        }
        vm.previous = function() {
            TemplateCreatorSrvc.goBack($state.current.name);
        }
        
        vm.updateStyle();
    }
})();