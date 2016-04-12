(function() {
	'use strict';

	angular
		.module('app.tabs', [
			'ionic'
		])
    
        .config(function($stateProvider) {
            $stateProvider
                  // setup an abstract state for the tabs directive
                .state('tab', {
                    url: '/tab',
                    abstract: true,
                    templateUrl: 'scripts/tabs/tabs.html'
                })
		});
    
})();