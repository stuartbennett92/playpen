(function() {
	'use strict';

	angular
		.module('basicapp.common')
		.factory('historyExtras', historyExtras);

	historyExtras.$inject = ['$ionicHistory', '_'];

	/* @ngInject */
	function historyExtras($ionicHistory, _) {

        var service = {};


        
        service.goBackMany = function(depth){
            // get the right history stack based on the current view
            var historyId = $ionicHistory.currentHistoryId();
            var history = $ionicHistory.viewHistory().histories[historyId];
            // set the view 'depth' back in the stack as the back view
            var targetViewIndex = history.stack.length - 1 - depth;
            $ionicHistory.backView(history.stack[targetViewIndex]);
            // navigate to it
            $ionicHistory.goBack();
        };
        
        service.returnToState = function(stateName){
        	var success = false;
            var historyId = $ionicHistory.currentHistoryId();
            var history = $ionicHistory.viewHistory().histories[historyId];
            for (var i = history.stack.length - 1; i >= 0; i--){
                if (history.stack[i].stateName == stateName){
                    $ionicHistory.backView(history.stack[i]);
                    $ionicHistory.goBack();
                    success = true;
                }
            }
        };
        
        service.parseSref = function(sref){
            
            var result = {};
            result.name="";
            result.params={};
            var components = sref.split("(");
            
            if(components.length > 0){
                result.name = _.trim(components[0]);
            
            
                if(components.length > 1){
                    
                    var firstIndex = sref.indexOf("(");
                    var lastIndex = sref.lastIndexOf(")");
                    
                    if((firstIndex != -1) && (lastIndex != -1)){
                        var candidate = sref.slice(firstIndex+1, lastIndex);
                            
                        result.params = JSON.parse(candidate);
                        
                    }
                    
                }
            
            }
            
            return result;
            
            
        }
        
        
        return service;
        
	}
})();
