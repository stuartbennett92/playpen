(function () {
    'use strict';

    angular
        .module('basicapp.wizard.train.where-are-you')
        .controller('ConfirmJourneyController', ConfirmJourneyController);

    ConfirmJourneyController.$inject = ['$state', 
                                        '$ionicHistory',
                                        'historyExtras',
                                        'journeyDisplayService',
                                        'parameterPasser'];

    /* @ngInject */
    function ConfirmJourneyController($state, 
                                       $ionicHistory,
                                       historyExtras,
                                       journeyDisplayService,
                                       parameterPasser) {
        
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
        if($state.params.next != undefined){
            parameterPasser.put('wizard.train.whereareyou.next',$state.params.next);
        }

         
        // Update from the parameterPasser
		var vm = angular.extend(this, {
			next: parameterPasser.get('wizard.train.whereareyou.next'),
            abort_state: parameterPasser.get('wizard.train.whereareyou.abort_state'),
            completion_state: parameterPasser.get('wizard.train.whereareyou.completion_state'),
            result_name: parameterPasser.get('wizard.train.whereareyou.result_name')
		});
        
 //////////////////// END common functionality  ///////////    

        // define what happens on previous, cancel and next buttons.

        // supplied by the module's state definition
        vm.onNext = function(){
            parameterPasser.put("journey",vm.journey); 
            $state.go(vm.next);
        }
        
        // supplied by the module's state definition
        vm.onPrev = function(){
            if(!vm.isLoading){
                parameterPasser.put("journey",vm.journey); 
            }
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
        


 //////////////////// specific functionality  ///////////    
        
        vm.searchTerm = ''; //angular binding
        vm.journey = {};
        vm.journey.activities = [];   //angular binding
        vm.busy = false;    //when true, we're loading up data, so don't keep calling
        vm.loading = false;  // false, so we don't confuse the user. The flag will be checked when they start typing.
        vm.train = parameterPasser.get("train"),
        
            
            
        //parameterPasser.clear("location"); //TODO: REINSTATE

        vm.onSearchTermChange = function onSearchTermChange() {
                getJourney(vm.searchTerm);
        }

        function getJourney(searchTerm) {

                vm.loading = !journeyDisplayService.isLoaded();
                journeyDisplayService.searchJourney(searchTerm, vm.train, vm.journey.activities)
                    .then(
                        function (d) {
                            vm.loading = !journeyDisplayService.isLoaded();
                        }
                    );

        }
        
        function clear(){
            journeyDisplayService.clear();
        }
        
        
        // GO!
        clear();
        getJourney('');
        
    }
})();