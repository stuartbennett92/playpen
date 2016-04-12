(function() {
	'use strict';

	angular
		.module('app.template', [
			'ionic'
		])
        		.config(function($stateProvider) {
			$stateProvider
				.state('template', {
					url: '/template',
                    abstract: true,
                    templateUrl: 'scripts/template/template.html'
				})  

		});
    })();