(function() {
	'use strict';

	angular
		.module('app.main', [
			'ionic'
		])
        .config(function($stateProvider) {
			$stateProvider
				.state('main', {
					url: '/main',
					templateUrl: 'scripts/main/main.html',
                    controller: 'mainCtrl as vm'
                })
		});
})();