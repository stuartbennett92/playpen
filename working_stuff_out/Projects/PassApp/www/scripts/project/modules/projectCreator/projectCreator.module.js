(function() {
	'use strict';

	angular
		.module('basicapp.projectCreator', [
			'ionic'
  
		])
		.config(function($stateProvider) {
        
            $stateProvider
            .state('createProjectName', {
                cache: false,
                url: '^/project/name',
                templateUrl: 'scripts/project/modules/projectCreator/name/name.html',
                controller: 'projectCreatorNameCtrl as vm'
            })
            .state('createProjectTemplate', {
                cache: false,
                url: '^/project/template',
                templateUrl: 'scripts/project/modules/projectCreator/template/template.html',
                controller: 'projectCreatorTempCtrl as vm'
            })
            .state('createProjectPreview', {
                cache: false,
                url: '^/project/preview',
                templateUrl: 'scripts/project/modules/projectCreator/preview/preview.html',
                controller: 'projectCreatorPreviewCtrl as vm'
            }) 
		});
})();