(function() {
	'use strict';

	angular
		.module('basicapp.projectViewer', [
			'ionic'
		])
        .config(function($stateProvider) {
			$stateProvider
				.state('projectViewer', {
					cache: false,
					url: '/project/projectViewer',
                    //abstract: 'true',
					templateUrl: 'scripts/project/modules/projectViewer/projectViewer.html',
                    controller: 'ProjectViewerCtrl as vm',
					/*
					views: {
						'projectViewer': {
							url: '/',	
							templateUrl: 'scripts/project/modules/projectViewer/projectViewer.html',
                    		controller: 'ProjectViewerCtrl as vm'
						},
						'viewer': {
							url: '/',
							//templateUrl: 'scripts/project/modules/projectViewer/projectViewer.html/viewer.view.html'
							//controller: 'FirstController'
						},
						'dataSets': {
							url: '/',
							//templateUrl: 'templates/scripts/project/modules/projectViewer/dataSets.view.html'
							//controller: 'ScdController'
						}
					}
					*/
				})
				
				.state('projectAddData', {
					cache: false,
					url: '/project/projectAddData',
					templateUrl: 'scripts/project/modules/projectViewer/addData/addData.html',
                    controller: 'ProjectAddDataCtrl as vm',
					
				})
		});
    })();