(function() {
	'use strict';

	angular
		.module('basicapp.menu', [
			'ionic'
		])
		.config(function($stateProvider) {
        console.log("menu.module.js. - 9");
			$stateProvider
				.state('app', {
					url: '/app',
					abstract: true,
					templateUrl: 'scripts/menu/menu.html',
					controller: 'MenuController as vm'
				});
		});
})();
