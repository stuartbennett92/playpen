(function() {
	'use strict';

	angular
		.module('basicapp.project', [
			'ionic'
		])
        .config(function($stateProvider) {
			$stateProvider
				.state('project', {
					cache: false,
					url: '/project',
                    templateUrl: 'scripts/project/project.html',
                    controller: 'ProjectController as vm'
				})  

		});
    })();