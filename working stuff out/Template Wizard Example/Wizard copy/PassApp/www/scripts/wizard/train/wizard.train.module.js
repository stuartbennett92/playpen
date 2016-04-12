(function() {
	'use strict';

	angular
		.module('basicapp.wizard.train', [
			'ionic',
			'basicapp.common'
		])
		.config(function($stateProvider) {
    			$stateProvider
				.state('wizard.train', {
					url: '/wizard/train',    
                    views: {
						'wizard-container': {
				            templateUrl: 'scripts/wizard/train/wizard.train.html'
						}
					}
                })
    
        
        

//                    abstract: true,
//                    templateUrl: 'scripts/wizard/train/wizard.train.html'
//				})  
		});
})();
