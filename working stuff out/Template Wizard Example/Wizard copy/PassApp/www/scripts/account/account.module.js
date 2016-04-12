(function() {
	'use strict';

	angular
		.module('app.account', [
			'ionic'
		])
    
        .config(function($stateProvider) {
            $stateProvider
              .state('tab.account', {
                url: '/account',
                views: {
                  'tab-account': {
                    templateUrl: 'scripts/account/account.html',
                    controller: 'SettingsController as vm'
                  }
                }
              });
		});
    
})();