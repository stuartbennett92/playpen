(function () {
    'use strict';

    angular
        .module('basicapp.projectCreator')
        .controller('projectCreatorPreviewCtrl', projectCreatorPreviewCtrl);

    projectCreatorPreviewCtrl.$inject = [
                                '$state',
                                'ProjectCreatorSrvc'
                                ];

    /* @ngInject */
    function projectCreatorPreviewCtrl(    
                                $state,
                                ProjectCreatorSrvc
                                )       {
                                     
        var vm = angular.extend(this, {
            //nothing - just a project.
        });
        
        vm.project = ProjectCreatorSrvc.rtnProject();
        
        //CONTROLLER HERE
        vm.next = function() {
            ProjectCreatorSrvc.moveOn($state.current.name);
        }
        vm.previous = function() {
            ProjectCreatorSrvc.goBack($state.current.name);
        }           
    } 
})();