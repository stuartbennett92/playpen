(function () {
    'use strict';

    angular
        .module('basicapp.trains')
        .factory('trainsService', trainsService);

    trainsService.$inject = ['$q', '_', 'dateFormat','isambard', 'locationsService','tocsService'];

    /* @ngInject */
    function trainsService($q, _, dateFormat, isambard, locationsService, tocsService) {


        var service = {
                data:  {
                        locationId:'',
                        isLoaded: false,
                        busy: false,
                        trains: [],
                        map:{}
                        }            
        };


        service.loadData = function loadData() {
            
            var deferred = $q.defer();
            var self = this;

            function loadAll() {
                self.data.busy = true;
                isambard.getTrainsSearch(self.getConfig(self.data.locationId))
                    .then(
                        function (d) {
                            if (d.status == 200) {
                                if (d.data.list.length > 0) {
                                    _.each(d.data.list, function (item) {
                                        
                                            var date =  new Date(0);
                                            date.setUTCSeconds(item.journeyStartTs);
                                        
                                            var time = dateFormat(date,"HH:MM");
                                        
                                            self.data.trains.push({
                                                origin: locationsService.getLocation(item.locationDocIdOrigin),
                                                destination: locationsService.getLocation(item.locationDocIdDestination),
                                                timeOfArrival: time, 
                                                toc: tocsService.getToc(item.tocDocId),
                                                id: item.id
                                            });
                                        
                                        
                                    })
                                }
                                self.data.busy = false;
                                self.data.isLoaded = true;
                                deferred.resolve(self.data);
                            }else{
                                self.data.busy = false;
                                deferred.resolve(self.data);
                            }
                            
                        })
            }            
            loadAll();
            return deferred.promise;

        };

        service.loadAllData = function loadAllData(locationId) {
            var self = this;
            var deferred = $q.defer();
            self.data.locationId = locationId;
            self.data.trains = [];
            self.loadData()
                .then(function (d) {
                    self.data.map = _.keyBy(self.data.locations, 'id');
                    deferred.resolve(self.data);
                })
            return deferred.promise;
        }

        service.getTrains = function getTrains() {
            return this.data.trains;
        }
        
        service.clear = function clear(){
            this.data.trains.length=0;
            this.data.isLoaded = false;   
        }

        service.isLoaded = function isLoaded() {
            return this.data.isLoaded;
        }

        service.isBusy = function isBusy(){
            return this.data.busy;
        }

        service.getConfig = function getConfig(locationId) {
            return {
                params: {
                    locationId: locationId,
                    arrivals: true, 
                    departures: false
                },
                headers: {
                    Accept: 'application/json'
                }
            };
        }


        service.getTrain = function getTrain(trainId) {
            return this.data.map[trainId];
        }
        
        return service;
    }
    
})();