(function () {
    'use strict';

    angular
        .module('basicapp.trains')
        .factory('trainsSearchService', trainsSearchService);

    trainsSearchService.$inject = ['$q', '_', 'trainsService'];

    /* @ngInject */
    function trainsSearchService($q, _, trainsService) {

        var service = {
            searchTerm:''
        };

        service.search = function search(searchTerm, candidates, container) {
            
            container.length=0; // clear the array down.
            
            
            _.forEach(candidates, function (item) {

                if(searchTerm.length > 0){
                   
                    var term = _.toLower(searchTerm);
                    var candidateOrg = _.toLower(item.origin.locationName);
                    var candidateDest = _.toLower(item.destination.locationName);
                    var candidateTime = item.journeyStartTs;

                    if (candidateTime.startsWith(term) || 
                        candidateOrg.startsWith(term) || 
                        candidateDest.startsWith(term)) {
                            container.push(item);  
                    } 

                }else{
                   container.push(item);  
                }
                


            });
            
        }

        service.searchTrains = function searchTrains(searchTerm, location, container) {
            var deferred = $q.defer();
            var self = this;
            self.searchTerm = searchTerm; 
            function loadAndSearch() {
                
                if (!trainsService.isLoaded() && !trainsService.isBusy()) {
                    trainsService.loadAllData(location.id)
                        .then(
                            function (d) {
                                self.search(self.searchTerm, trainsService.getTrains(), container);
                                deferred.resolve(container);
                            }
                        )
                } else {
                    self.search(self.searchTerm, trainsService.getTrains(), container);
                    deferred.resolve(container);
                }
            }
            loadAndSearch();
            return deferred.promise;
        }


        service.isLoaded = function isLoaded() {
            return trainsService.isLoaded();
        }

        service.isBusy = function isBusy(){
            return trainsService.isBusy();
        }

        service.getTrain = function getTrain(trainId) {
            return trainsService.getTrain(trainId);
        }
        
        service.clear = function clear(){
            trainsService.clear();
        }
        
        return service;
    }
})();