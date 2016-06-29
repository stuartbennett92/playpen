(function () {
    'use strict';

    angular
        .module('basicapp.projectViewer')
        .controller('ProjectViewerCtrl', ProjectViewerCtrl);

    ProjectViewerCtrl.$inject = [
        '$state',
        'ProjectService',
        '$ionicSideMenuDelegate'
        ];

    /* @ngInject */
    function ProjectViewerCtrl(
        $state,
        ProjectService,
        $ionicSideMenuDelegate
        ) {
                                     
        var vm = angular.extend(this, {
            //nothing - just a project.
        });
        
        //CONTROLLER HERE
        
        vm.project = ProjectService.project;
        vm.noOfSets = (ProjectService.project.dataSets).length;
        
        //vm.a = true;
        vm.isViewer = true;
        
        vm.addData = function() {
            $state.go('projectAddData');
        }
        
    }
})();