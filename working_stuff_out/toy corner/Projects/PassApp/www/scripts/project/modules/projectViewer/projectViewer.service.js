(function () {
    'use strict';
    
    angular
        .module('basicapp.projectViewer')
        .factory('ProjectService', ProjectService);
        
    ProjectService.$inject = [];
    function ProjectService() {
        
        var service = {};
        service.project = {};
        service.key = '';

        service.getProject = function(key) {
            service.key = key;
            angular.copy((angular.fromJson(window.localStorage.getItem(key))), service.project);
            return service.project;
        }
        
        service.addDataSet = function(dataSet) {
            service.project.dataSets.push(dataSet);
            service.orderDataSetsByDate();
            service.save();
        }
        
        service.orderDataSetsByDate = function() {
            service.project.dataSets.sort(function(a,b) {
                return new Date(b.date) - new Date(a.date);
            });
        }
        
        service.deleteDataSet = function(dataSet) {
            var index = service.project.dataSets.indexOf(dataSet);
            
            if (index != -1) {
                service.project.dataSets.splice(index, 1);
                service.save();
            }
        }
        
        service.updateDataSet = function(oldSet, newSet) {
            var index = service.project.dataSets.indexOf(oldSet);
            if (index != -1) {
                service.project.dataSets.splice(index, 1);
                service.addDataSet(newSet);
            }
        }

        service.save = function () {
            window.localStorage[service.key] = angular.toJson(service.project);
        }
        return service;
    }
})();