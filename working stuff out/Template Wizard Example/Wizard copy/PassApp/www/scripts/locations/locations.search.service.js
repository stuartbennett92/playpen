(function () {
    'use strict';

    angular
        .module('basicapp.locations')
        .factory('locationsSearchService', locationsSearchService);

    locationsSearchService.$inject = ['$q', '_', 'locationsService'];

    /* @ngInject */
    function locationsSearchService($q, _, locationsService) {

        var service = {
            searchTerm:''
        };

        service.search = function search(searchTerm, candidates, container) {
            
            container.length=0; // clear the array down.
            
            
            _.forEach(candidates, function (item) {

                var term = _.toLower(searchTerm);
                var candidateName = _.toLower(item.locationName);
                var candidateCode = _.toLower(item.locationCode);

                if (candidateName.startsWith(term) || candidateCode == term) {
                    container.push({
                        id: item.id,
                        locationCode: item.locationCode,
                        locationName: item.locationName
                    });
                }

            });
            
        }

        service.searchLocations = function searchLocations(searchTerm, container) {
            var deferred = $q.defer();
            var self = this;
            self.searchTerm = searchTerm; 
            function loadAndSearch() {
                
                if (!locationsService.isLoaded() && !locationsService.isBusy()) {
                    locationsService.loadAllData()
                        .then(
                            function (d) {
                                self.search(self.searchTerm, locationsService.getLocations(), container);
                                deferred.resolve(container);
                            }
                        )
                } else {
                    self.search(self.searchTerm, locationsService.getLocations(), container);
                    deferred.resolve(container);
                }
            }
            loadAndSearch();
            return deferred.promise;
        }


        service.isLoaded = function isLoaded() {
            return locationsService.isLoaded();
        }

        service.isBusy = function isBusy(){
            return locationsService.isBusy();
        }

        service.getLocation = function getLocation(locationId) {
            return locationsService.getLocation(locationId);
        }
        return service;
    }
})();