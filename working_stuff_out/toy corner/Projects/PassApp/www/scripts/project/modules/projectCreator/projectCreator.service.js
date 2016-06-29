(function () {
    'use strict';
    
    angular
        .module('basicapp.projectCreator')
        .factory('ProjectCreatorSrvc', ProjectCreatorSrvc);
        
    ProjectCreatorSrvc.$inject = ['$state', 'ProjectListService'];
    function ProjectCreatorSrvc($state, ProjectListService) {
        
        var service = {};
        
        var project = {};
        project.name = '';
        project.attributes = [];
        project.style = '3';
        project.dataSets = [];
        
        service.getName = function () {
            return project.name;
        }
        service.setName = function (name) {
            angular.copy(name, project.name);
        }
        
        service.getAttributes = function () {
            return project.attributes;
        }
        service.setAttributes = function(attributes) {
            angular.copy(attributes, project.attributes);
        }
        
        service.setStyle = function (style) {
            project.style = style;
        }
        service.getStyle = function () {
            return project.style;
        }
        
        service.rtnProject = function () {
            return project;
        }

        service.Reset = function () {
            project.name = '';
            project.attributes = [];
            project.style = '3';
            project.dataSets = [];
        }
        
        var stateList = [
            'createProjectName',
            'createProjectTemplate',
            'createProjectPreview'
        ];
        
        service.moveOn = function (currentState) {
            var index = null;
            index = stateList.indexOf(currentState);
            if (index == null || index == -1) {
                console.log("ProjectCreatorSrvc.moveOn - \"invalid state given\"");
                return;
            }
            else if (index == (stateList.length - 1)) {
                service.finish();
            } 
            else {
                $state.go(stateList[index+1]);        
            }
        }
        
        service.goBack = function (currentState) {
            var index = null;
            index = stateList.indexOf(currentState);
            if (index == null) {
                console.log("ProjectCreatorSrvc.moveOn - \"invalid state given\"");
                return;
            }
            else if (index == 0) {
                service.cancel();
            }
            else {
                $state.go(stateList[index-1]);    
            }
        }
        
        service.finish = function () {
            var proj = {};
            angular.copy(project, proj);
            ProjectListService.Create(angular.copy(proj));
            service.Reset();
            $state.go('project');
        }
        
        service.cancel = function () {
            service.Reset();
            $state.go('project');
        }
        
        return service;
        
    }
})();