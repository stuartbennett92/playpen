(function () {
    'use strict';

    angular
        .module('basicapp.template')
        .factory('TemplateHandlerSrvc', TemplateHandlerSrvc);

    TemplateHandlerSrvc.$inject = [
        
    ];
    function TemplateHandlerSrvc(
        
    ){
        
        var template = {};
        
        template.empty = function () {
        
            template.name = "";
            template.attributes = [];
            template.style = "10";
        }
        
        //service function here.
        template.handleThis = function(tToHandle) {
            angular.copy(tToHandle, template);
        }
        
        return template;
    }
})();