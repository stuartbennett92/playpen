(function() {
	'use strict';

    // this is the controller for the initial state of the 
    // where are you wizard.
    
    
	angular
		.module('basicapp.wizard.train.where-are-you')
		.controller('StartController', StartController);

	StartController.$inject = [
                                     '$state',
                                     '$ionicHistory',
                                     'parameterPasser',
                                     'historyExtras',
                                     'locationsSearchService', 
                                     'tocsSearchService'];

	/* @ngInject */
	function StartController(
                                    $state,
                                    $ionicHistory, 
                                    parameterPasser,
                                    historyExtras, 
                                    locationsSearchService, 
                                    tocsSearchService) {
                            
         
//////////////////// common functionality - refactor into wizard-state-controller /////////// 
        
        // Attempt to update the parameterPasser from the params, if they have been passed in
                                        
        if($state.params.abort_state != undefined){
           parameterPasser.put('wizard.train.whereareyou.abort_state',$state.params.abort_state);
        }
        if($state.params.completion_state != undefined){
            parameterPasser.put('wizard.train.whereareyou.completion_state',$state.params.completion_state);    
        }
        if($state.params.result_name != undefined){
            parameterPasser.put('wizard.train.whereareyou.result_name',$state.params.result_name);    
        }
         
        // Update from the parameterPasser
		var vm = angular.extend(this, {
            choices: $state.params.next.choices,
			next: $state.params.next.choice,
            abort_state: parameterPasser.get('wizard.train.whereareyou.abort_state'),
            completion_state: parameterPasser.get('wizard.train.whereareyou.completion_state'),
            result_name: parameterPasser.get('wizard.train.whereareyou.result_name')
		});
        
//////////////////// END common functionality  /////////// 


        // define what happens on previous, cancel and next buttons.


        // supplied by the module's state definition
        vm.onNext = function(){
            $state.go(vm.next);
        }
        
        // supplied by the module's state definition
        vm.onPrev = function(){
            $ionicHistory.goBack();
        }
        
        // supplied by the client ui-sref parameter
        vm.onCancel = function(){
            $ionicHistory.goToHistoryRoot();
            var sref = historyExtras.parseSref(vm.abort_state);
            $state.go(sref.name, sref.params);
        }
        
        // supplied by the client ui-sref paramparseSrefeter
        vm.onComplete = function(){
            var sref = historyExtras.parseSref(vm.completion_state);
            $state.go(sref.name, sref.params);
        }
        
                                        
        function populateServices(){
            locationsSearchService.searchLocations(null,null);
            tocsSearchService.searchTocs(null,null);
        }
       
        populateServices(); 
	}
})();
