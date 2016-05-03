(function() {
	'use strict';

	angular
		.module('basicapp.template', [
			'ionic'
		])
        .config(function($stateProvider) {
			$stateProvider
				.state('template', {
					cache: false,
					url: '/template',
                    //abstract: true,
                    templateUrl: 'scripts/template/template.html'   ,
                    controller: 'TemplateController as vm'
				})  

		});
    })();