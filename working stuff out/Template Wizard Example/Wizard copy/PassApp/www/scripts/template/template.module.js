(function() {
	'use strict';

	angular
		.module('basicapp.template', [
			'ionic',
			'basicapp.common'
		])
        .config(function($stateProvider) {
			$stateProvider
				.state('template', {
					url: '/template',
                    //abstract: true,
                    templateUrl: 'scripts/template/template.html'
				})  

		});
    })();