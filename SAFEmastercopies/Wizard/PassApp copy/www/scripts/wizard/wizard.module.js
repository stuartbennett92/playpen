(function() {
	'use strict';

	angular
		.module('basicapp.wizard', [
			'ionic',
			'basicapp.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('wizard', {
					url: '/wizard',
                    abstract: true,
                    templateUrl: 'scripts/wizard/wizard.html'
				})  

		});
})();
