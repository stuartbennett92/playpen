(function () {
    'use strict';

    angular
        .module('basicapp.journey')
        .factory('journeyDisplayService', journeyDisplayService);

    journeyDisplayService.$inject = ['$q', '_', 'journeyService'];

    /* @ngInject */
    function journeyDisplayService($q, _, journeyService) {

        var service = {
            searchTerm:''
        };

        service.search = function search(searchTerm, candidates, container) {
            
            container.length=0; // clear the array down.
            
            
            _.forEach(candidates, function (item) {

                if(searchTerm.length > 0){
                   
                    var term = _.toLower(searchTerm);
                    var candidateType = _.toLower(item.type);
                    var candidateLocation = _.toLower(item.location);
                    var candidateTime = item.time;

                    if (candidateType.startsWith(term) || 
                        candidateLocation.startsWith(term) || 
                        candidateTime.startsWith(term)) {
                            container.push(item);  
                    } 

                }else{
                   container.push(item);  
                }
                


            });
            
        }

        service.searchJourney = function searchJourney(searchTerm, train, container) {
            var deferred = $q.defer();
            var self = this;
            self.searchTerm = searchTerm; 
            function loadAndSearch() {
                
                if (!journeyService.isLoaded() && !journeyService.isBusy()) {
                    journeyService.loadAllData(train.id)
                        .then(
                            function (d) {
                                self.search(self.searchTerm, journeyService.getActivities(), container);
                                deferred.resolve(container);
                            }
                        )
                } else {
                    self.search(self.searchTerm, journeyService.getActivities(), container);
                    deferred.resolve(container);
                }
            }
            loadAndSearch();
            return deferred.promise;
        }


        service.isLoaded = function isLoaded() {
            return journeyService.isLoaded();
        }

        service.isBusy = function isBusy(){
            return journeyService.isBusy();
        }
        
        service.clear = function clear(){
            journeyService.clear();
        }
        
        return service;
    }
})();