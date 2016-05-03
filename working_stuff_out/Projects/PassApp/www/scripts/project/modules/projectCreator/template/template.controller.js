(function () {
    'use strict';

    angular
        .module('basicapp.projectCreator')
        .controller('projectCreatorTempCtrl', projectCreatorTempCtrl);

    projectCreatorTempCtrl.$inject = [
                                '$state',
                                'ProjectCreatorSrvc',
                                'TemplateService'
                                ];

    /* @ngInject */
    function projectCreatorTempCtrl(    
                                $state,
                                ProjectCreatorSrvc,
                                TemplateService
                                )       {
                                     
        var vm = angular.extend(this, {
            //nothing - just a project.
        });
        
        //CONTROLLER HERE
        vm.templateList = TemplateService;
        
        vm.templateList.select((vm.templateList[0]).name);
    
        vm.next = function() {
            ProjectCreatorSrvc.setAttributes((TemplateService.rtnSelected()).attributes);
            ProjectCreatorSrvc.setStyle((TemplateService.rtnSelected()).style);
            
            ProjectCreatorSrvc.moveOn($state.current.name);
        } 
        vm.previous = function() {
            ProjectCreatorSrvc.goBack($state.current.name);
        }            
    } 
})();