(function() {
	'use strict';

	angular
		.module('basicapp.home', [
			'ionic',
            'ngCordova',
            'basicapp.common'
		])
		.config(function($stateProvider) {
            console.log("home.config - 11");            
			$stateProvider
				.state('app.home', {
					url: '/home',
					views: {
						'menuContent': {
							templateUrl: 'scripts/home/home.html',
							controller: 'HomeController as vm'
						}
					}
				});
		});
})();
