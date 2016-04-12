(function () {
    'use strict';

    angular
        .module('basicapp.wizard.train.where-are-you')
        .controller('SummaryController', SummaryController);

    SummaryController.$inject = ['$state', 
                                 '$ionicHistory',
                                 'historyExtras',
                                 'parameterPasser',
                                 '_',
                                 'journeyService'
                                ];

    /* @ngInject */
    function SummaryController(
                    $state, 
                     $ionicHistory, 
                     historyExtras,
                     parameterPasser,
                     _,
                     journeyService
                    ) {
        
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
            parameterPasser.put("location",vm.selection); 
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
        

        

        
        // supplied by the client ui-sref parameter
        vm.onComplete = function(){
            
            var result = {};
            result.location = vm.location;
            result.train = vm.train;
            result.journey = vm.journey;
            result.nextStop = vm.nextStop;
            
            console.log(result);
            
            parameterPasser.put(vm.result_name,result);
            
            var sref = historyExtras.parseSref(vm.completion_state);
            $state.go(sref.name, sref.params);

        }
        
        vm.getNextStop = function(location, journey){
            
            return journeyService.getNextStop(location,journey);
        }
        

 //////////////////// specific functionality  ///////////
        
        vm.location = parameterPasser.get("location");
        vm.train = parameterPasser.get("train");
        vm.journey = parameterPasser.get("journey");
        vm.nextStop = vm.getNextStop(vm.location, vm.journey);

    }
})();