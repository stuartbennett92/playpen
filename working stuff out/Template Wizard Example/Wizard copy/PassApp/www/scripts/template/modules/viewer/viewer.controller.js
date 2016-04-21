(function () {
    'use strict';

    angular
        .module('basicapp.templateViewer')
        .controller('templateViewerCtrl', templateViewerCtrl);

    templateViewerCtrl.$inject = [
        '$state',
        'TemplateService',
        '$ionicSideMenuDelegate'
        ];

    /* @ngInject */
    function templateViewerCtrl(
        $state,
        TemplateService,
        $ionicSideMenuDelegate
        ) {
                                     
        var vm = angular.extend(this, {
            //nothing - just a template.
        });
        
        //CONTROLLER HERE
        
        vm.template = TemplateService.rtnSelected();
             
    }
})();