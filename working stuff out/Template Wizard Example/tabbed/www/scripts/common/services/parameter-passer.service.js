(function() {
	'use strict';

	angular
		.module('basicapp.common')
		.factory('parameterPasser', parameterPasser);

	parameterPasser.$inject = [];

	/* @ngInject */
    // A simple over-to-you parameter passer
    // Originating controller will set its result in a number of key-value pairs on an object.
    // The object is stored as a value in a key whose name is known by the destination controller.
    // Desination controller knows the format of the key-value pairs, and will grab the ones it wants.
    // The Destination Controller will DELETE the named key and its value when finished.
	function parameterPasser() {

        var service = {
                data:  {
                        }            
        };

        service.put = function(key, value){
            service.data[key] = value;
        };
        
        service.get = function(key){
            return service.data[key];
        }
        
        service.clear = function(key){
            service.data[key] = null;
        }
        
        return service;
        
	}
})();