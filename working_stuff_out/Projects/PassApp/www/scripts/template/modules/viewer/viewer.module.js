(function() {
	'use strict';

	angular
		.module('basicapp.templateViewer', [
			'ionic'
  
		])
		.config(function($stateProvider) {
            
            $stateProvider
            .state('templateViewer', {
                cache: false,
                url: 'view/template',
                templateUrl: 'scripts/template/modules/viewer/viewer.html',
                controller: 'templateViewerCtrl as vm'
            })
		});
})();