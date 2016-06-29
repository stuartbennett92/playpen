(function() {
	'use strict';

	angular
		.module('basicapp.popover-menu', [
			'ionic'
		])
		.config(function($stateProvider) {
            console.log("popover-menu.module.js - 9");
			$stateProvider
				.state('app.popover-menu', {
					url: '/popover-menu',
					views: {
						'menuContent': {
							templateUrl: 'scripts/popover-menu/popover-menu.html',
							controller: 'PopoverMenuController as vm'
						}
					}
				});
		});
})();
