(function () {
    'use strict';

    angular
        .module('basicapp.wizard.train.where-are-you')
        .controller('ChooseTrainController', ChooseTrainController);

    ChooseTrainController.$inject = ['$state', 
                                        '$ionicHistory',
                                        'historyExtras',
                                        'trainsSearchService',
                                        'parameterPasser'];

    /* @ngInject */
    function ChooseTrainController($state, 
                                       $ionicHistory,
                                       historyExtras,
                                       trainsSearchService,
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
            location: parameterPasser.get('location'),
			next: parameterPasser.get('wizard.train.whereareyou.next'),
            abort_state: parameterPasser.get('wizard.train.whereareyou.abort_state'),
            completion_state: parameterPasser.get('wizard.train.whereareyou.completion_state'),
            result_name: parameterPasser.get('wizard.train.whereareyou.result_name')
		});
        
 //////////////////// END common functionality  /////////// 
        
        // define what happens on previous, cancel and next buttons.

        // supplied by the module's state definition
        vm.onNext = function(){
            parameterPasser.put("train",vm.selection); 
            $state.go(vm.next);
        }
        
        // supplied by the module's state definition
        vm.onPrev = function(){
            if(!vm.unselected){
                parameterPasser.put("train",vm.selection); 
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
        vm.trains = [];   //angular binding
        vm.busy = false;    //when true, we're loading up data, so don't keep calling
        vm.loading = false;  // false, so we don't confuse the user. The flag will be checked when they start typing.
        vm.selection = {};
        vm.unselected = true;      
        
        

        vm.onSearchTermChange = function onSearchTermChange() {
            
            if (vm.searchTerm.length > 0) {
                getTrains(vm.searchTerm);
            } else {
                vm.locations.length=0;
            }
            
        }


        function getTrains(searchTerm) {

                vm.loading = !trainsSearchService.isLoaded();
                trainsSearchService.searchTrains(searchTerm, vm.location, vm.trains)
                    .then(
                        function (d) {
                            vm.loading = !trainsSearchService.isLoaded();
                        }
                    );

        }
        
        function clearTrains(){
            trainsSearchService.clear();
        }
        
        vm.setSelectedItem = function setSelectedItem(train) {
            vm.selection.selected = false;
            train.selected = true;
            vm.selection = train;
            vm.unselected = false;
        }

        
        // GO!
        clearTrains();
        getTrains('');
        
    }
})();