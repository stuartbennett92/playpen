(function () {
    'use strict';
    
    angular
        .module('basicapp.projectViewer')
        .factory('AddDataService', AddDataService);
        
    AddDataService.$inject = ['$state', 'ProjectService'];
    function AddDataService($state, ProjectService) {
        
        var service = {};
        
        service.date = '';
        service.data = [];
        service.tag  = '';
        
        service.getAttributes = function() {
            service.attributes = ProjectService.project.attributes;
        }

        service.addDataSet = function () {
            var dataSet = {
                'date': service.date,
                'data': service.data,
                'tag' : service.tag
            };
            ProjectService.addDataSet(dataSet);
        }
        
        return service;
    }
})();