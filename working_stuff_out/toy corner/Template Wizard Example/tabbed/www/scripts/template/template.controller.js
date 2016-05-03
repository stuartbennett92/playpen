(function () {
    'use strict';

    angular
        .module('app.template')
        .controller('TemplateController', TemplateController);

    TemplateController.$inject = ['$state', 'TemplateService', 'parameterPasser'];

    /* @ngInject */
    function TemplateController($state, TemplateService, parameterPasser) { 
        var vm = angular.extend(this, {
            
            // no attributes.

        });
        
        //used to pass in a newAttribute.
        vm.newAtt = {};
        vm.newAtt.name = '';
        vm.newAtt.desc = '';
        
        //passed into service on finish
        vm.tTemplate = {};
        vm.tTemplate.name = '';
        vm.tTemplate.attributes = [];
        vm.tTemplate.style = 10;
        
        vm.addAttribute = function(v) {
            if(v === '' || v === null)
            return;
            vm.tTemplate.attributes.push(v);
            vm.newAtt = null;
        }
        
        vm.removeAttribute = function(v) {
            var index = null;
            index = vm.tTemplate.attributes.indexOf(v);
            vm.tTemplate.attributes.splice(index, 1);
        }
        
        vm.next = function () {
            parameterPasser.put("tTemplate", vm.tTemplate);
            //console.log(parameterPasser.get("tTemplate"));
            $state.go('template.summary');
        }
        /*
        vm.finish = function () {
            TemplateService.addTemplate(vm.tTemplate);
            vm.cancel();
        }*/
        vm.cancel = function() {
            
            vm.tTemplate = {};
            vm.newAtt = {};
        }        
    }
})();