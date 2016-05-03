(function() {
	'use strict';

	angular
		.module('basicapp.home')
		.factory('menuItems', menuItems);

	menuItems.$inject = [];

	/* @ngInject */
	function menuItems() {
		var data = [{
			title: 'PopOver menu',
			path: 'popover-menu',
			icon: 'ion-ios-arrow-down'
		}];

		return data;
	}
})();
