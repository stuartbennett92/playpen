(function () {
    'use strict';

    angular
        .module('basicapp.tocs')
        .factory('tocsSearchService', tocsSearchService);

    tocsSearchService.$inject = ['$q', '_', 'tocsService'];

    /* @ngInject */
    function tocsSearchService($q, _, tocsService) {

        var service = {
            searchTerm:''
        };

        service.search = function search(searchTerm, candidates, container) {
            
            container.length=0; // clear the array down.
            _.forEach(candidates, function (item) {

                var term = _.toLower(searchTerm);
                var candidateName = _.toLower(item.companyName);
                var candidateCode = _.toLower(item.companyCode);

                if (candidateName.startsWith(term) || candidateCode == term) {
                    container.push({
                        id: item.id,
                        companyCode: item.companyCode,
                        companyName: item.companyName,
                        logoImageUrl: item.logoImageUrl
                    });
                }

            });
            
        }

        service.searchTocs = function searchTocs(searchTerm, container) {
            var deferred = $q.defer();
            var self = this;
            self.searchTerm = searchTerm; 
            function loadAndSearch() {
                
                if (!tocsService.isLoaded() && !tocsService.isBusy()) {
                    tocsService.loadAllData()
                        .then(
                            function (d) {
                                self.search(self.searchTerm, tocsService.getTocs(), container);
                                deferred.resolve(container);
                            }
                        )
                } else {
                    self.search(self.searchTerm, tocsService.getTocs(), container);
                    deferred.resolve(container);
                }
            }
            loadAndSearch();
            return deferred.promise;
        }


        service.isLoaded = function isLoaded() {
            return tocsService.isLoaded();
        }

        service.isBusy = function isBusy(){
            return tocsService.isBusy();
        }

        service.getToc = function getToc(tocId) {
            return tocsService.getToc(tocId);
        }
        return service;
    }
})();