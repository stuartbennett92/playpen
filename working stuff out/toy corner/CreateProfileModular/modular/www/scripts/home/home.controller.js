(function() {
	'use strict';

	angular
		.module('basicapp.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['menuItems'];

	/* @ngInject */
	function HomeController(menuItems) {
		var vm = angular.extend(this, {
			entries: menuItems
		});
	}
})();
