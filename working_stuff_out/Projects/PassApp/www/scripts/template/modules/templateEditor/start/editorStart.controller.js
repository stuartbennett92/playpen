(function () {
    'use strict';

    angular
        .module('basicapp.templateEditor')
        .controller('editTemplateStartCtrl', editTemplateStartCtrl);

    editTemplateStartCtrl.$inject = [
                                '$state',
                                'TemplateEditorSrvc'
                                ];

    /* @ngInject */
    function editTemplateStartCtrl(    
                                $state,
                                TemplateEditorSrvc
                                )       {
                                     
        var vm = angular.extend(this, {
            //nothing - just a template.
        });
        
        //CONTROLLER HERE
        //reinitialise editor
        TemplateEditorSrvc.reset();
        //move to name edit  
        $state.go('editTemplateName');      
    }
})();