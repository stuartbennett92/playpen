(function() {
	'use strict';

	angular
		.module('app.dash', [
			'ionic'
		])
    
    
    
        .config(function($stateProvider) {
            $stateProvider
                 // setup an abstract state for the tabs directive
                .state('tab.dash', {
                    url: '/dash',
                    views: {
                        'tab-dash': {
                            templateUrl: 'scripts/dash/dash.html',
                            controller: 'DashController as vm'
                        }
                    }
                })
		});
    

})();