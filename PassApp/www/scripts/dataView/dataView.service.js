(function () {
    'use strict';
    
    angular
        .module('app.dataView')
        .factory('DataViewService', DataViewService);
        
    DataViewService.$inject = ['$localStorage', '$window'];
    
    
    function DataViewService() {
        
        /* trying to take data(if any) and place into variable to be manipulated
        if no data is here yet, create a place for new data */
        var myData = window.localStorage['dataICreated'];
         
        /* trying to take stack of data and store it into local Storage*/       
        myData.add = function(data) {
            myData[myData.length] = data;
            
            $window.localStorage[dataICreated] = myData;
            
        }
        
        return myData;
    }
})();

