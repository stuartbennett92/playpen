(function () {
    'use strict';

    angular
        .module('basicapp.projectCreator')
        .controller('projectCreatorNameCtrl', projectCreatorNameCtrl);

    projectCreatorNameCtrl.$inject = [
                                '$state',
                                'ProjectCreatorSrvc'
                                ];

    /* @ngInject */
    function projectCreatorNameCtrl(    
                                $state,
                                ProjectCreatorSrvc
                                )       {
                                     
        var vm = angular.extend(this, {
            //nothing - just a project.
        });
        
        //CONTROLLER HERE
        vm.project = ProjectCreatorSrvc.rtnProject();
        
        vm.next = function() {
            //ProjectCreatorSrvc.setName(vm.name);
            ProjectCreatorSrvc.moveOn($state.current.name);
        }           
    }
})();