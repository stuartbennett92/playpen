(function () {
    'use strict';

    angular
        .module('basicapp.project')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['$state', 'ProjectService', 'TemplateService'];
    function ProjectController( $state, ProjectService, TemplateService) {
        var vm = angular.extend(this, {
            //nothing - just a project.
        });
        
        vm.projectList = ProjectService;
        vm.value = 0;
        
        if(TemplateService.length == 0){
            $state.go('template'); 
        }
        
       vm.startProjectCreator = function() {
            $state.go('createProjectName');
       }
       
    }
})();