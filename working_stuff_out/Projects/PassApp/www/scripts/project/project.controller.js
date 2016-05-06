(function () {
    'use strict';

    angular
        .module('basicapp.project')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['$state', 'ProjectListService', 'ProjectService', 'TemplateService'];
    function ProjectController( $state, ProjectListService, ProjectService, TemplateService) {
        var vm = angular.extend(this, {
            //nothing - just a project.
        });
        
        vm.projectList = ProjectListService;
        vm.value = 0;
        
        if(TemplateService.length == 0){
            $state.go('template'); 
        }
        
       vm.startProjectCreator = function() {
           
           $state.go('createProjectName');
       }
       
       vm.viewProject = function(projectRef) {
           ProjectService.getProject(projectRef.guid);
           $state.go('projectViewer');
       }
       
       
    }
})();