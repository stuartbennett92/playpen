(function() {
	'use strict';

	angular
		.module('basicapp.wizard.train.where-are-you', [
			'ionic',
			'basicapp.common',
            'basicapp.locations',
            'basicapp.tocs',
            'basicapp.trains'
		])
		.config(function($stateProvider) {
        
            console.log("REGISTERING STATES FOR WIZARD");
        
			$stateProvider
				.state('wizard.train.where-are-you', {
					url: '/wizard/train/where-are-you:abort_state?completion_state?result_name',
                    params:{
                        next:{
                                choices:[
                                    {name: "I'm at a station",
                                     value: 'wizard.train.choose-a-station'},
                                    {name: "I'm on a train",
                                    value:'wizard.train.choose-next-station'}
                                ],
                                choice: 'wizard.train.choose-a-station'
                             }  
                    },
					views: {
						'wizard-train-container': {
				            templateUrl: 'scripts/wizard/train/where-are-you/start/start.html',
							controller: 'StartController as vm'
						}
					}
				})
                .state('wizard.train.choose-a-station', {
					url: '/wizard/train/choose-a-station',
                    params: {
                        next: '^.summary'
                    },
					views: {
						'wizard-train-container': {
				            templateUrl: 'scripts/wizard/train/where-are-you/choose-a-station/choose-a-station.html',
							controller: 'ChooseAStationController as vm'
						}
					}
				})  
                .state('wizard.train.choose-next-station', {
					url: '/wizard/train/choose-next-station',
                    params: {
                        next: '^.latest-at-next-station'
                    },
					views: {
						'wizard-train-container': {
				            templateUrl: 'scripts/wizard/train/where-are-you/choose-next-station/choose-next-station.html',
							controller: 'ChooseAStationController as vm'
						}
					}
				})
            
                .state('wizard.train.latest-at-next-station', {
					url: '/wizard/train/latest-at-next-station',
                    params: {
                        next: '^.confirm-journey'
                    },
					views: {
						'wizard-train-container': {
				            templateUrl: 'scripts/wizard/train/where-are-you/choose-train/choose-train.html',
							controller: 'ChooseTrainController as vm'
						}
					}
				})
            
                .state('wizard.train.confirm-journey', {
					url: '/wizard/train/confirm-journey',
                    params: {
                        next: '^.summary' //end of the wizard
                    },
					views: {
						'wizard-train-container': {
				            templateUrl: 'scripts/wizard/train/where-are-you/confirm-journey/confirm-journey.html',
							controller: 'ConfirmJourneyController as vm'
						}
					}
				}) 
            
                .state('wizard.train.summary', {
					url: '/wizard/train/summary',
					views: {
						'wizard-train-container': {
				            templateUrl: 'scripts/wizard/train/where-are-you/summary/summary.html',
							controller: 'SummaryController as vm'
						}
					}
				})   
            
		});
})();
