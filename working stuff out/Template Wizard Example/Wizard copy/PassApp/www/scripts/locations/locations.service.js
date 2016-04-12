(function () {
    'use strict';

    angular
        .module('basicapp.locations')
        .factory('locationsService', locationsService);

    locationsService.$inject = ['$q', '_', 'isambard'];

    /* @ngInject */
    function locationsService($q, _, isambard) {


        var service = {
                data:  {
                        page: 0,
                        isLoaded: false,
                        busy: false,
                        locations: []
                        },            
        };


        service.loadData = function loadData() {
            
            var deferred = $q.defer();
            var self = this;

            function loadAll() {
                self.data.busy = true;
                isambard.getLocations(self.getConfig(self.data.page + 1))
                    .then(
                        function (d) {
                            if (d.status == 200) {
                                if (d.data.list.length > 0) {
                                    _.each(d.data.list, function (item) {
                                        self.data.locations.push({
                                            id: item.id,
                                            locationCode: item.locationCode,
                                            locationName: item.locationName
                                        });
                                    })
                                    self.data.page++;
                                    loadAll();
                                } else {
                                    self.data.busy = false;
                                    self.data.isLoaded = true;
                                    deferred.resolve(self.data);
                                }
                            }else{
                                self.data.busy = false;
                                deferred.resolve(self.data);
                            }
                            
                        })
            }            
            loadAll();
            return deferred.promise;

        };

        service.loadAllData = function loadAllData() {
            var self = this;
            var deferred = $q.defer();
            self.data.page = 0;
            self.data.locations = [];
            self.loadData()
                .then(function (d) {
                    self.data.map = _.keyBy(self.data.locations, 'id');
                    deferred.resolve(self.data);
                })
            return deferred.promise;
        }

        service.getLocations = function getLocations() {
            return this.data.locations;
        }

        service.isLoaded = function isLoaded() {
            return this.data.isLoaded;
        }

        service.isBusy = function isBusy(){
            return this.data.busy;
        }

        service.getConfig = function getConfig(page) {
            return {
                params: {
                    page: page,
                    size: 100
                },
                headers: {
                    Accept: 'application/json'
                }
            };
        }


        service.getLocation = function getLocation(locationId) {
//            var self = this;
//            if (self.data.locations.length) {
//                return $q.when(_.find(self.data.locations, 'id', locationId));
//            } else {
//                var deferred = $q.defer();
//
//                self.getLocations()
//                    .then(function () {
//                        deferred.resolve(_.find(self.data.locations, 'id', locationId));
//                    });
//
//                return deferred.promise;
//            }
            return this.data.map[locationId];
        }
        
        return service;
    }
    
})();