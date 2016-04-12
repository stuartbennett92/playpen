(function () {
    'use strict';

    angular
        .module('basicapp.journey')
        .factory('journeyService', journeyService);

    journeyService.$inject = ['$q', '_', 'dateFormat','isambard', 'locationsService','tocsService'];

    /* @ngInject */
    function journeyService($q, _, dateFormat, isambard, locationsService, tocsService) {


        var service = {
                data:  {
                        trainId:'',
                        isLoaded: false,
                        busy: false,
                        activities: [],
                        map:{}
                        }            
        };


        service.loadData = function loadData() {
            
            var deferred = $q.defer();
            var self = this;

            function loadAll() {
                self.data.busy = true;
                isambard.getTrainsProgressId(self.data.trainId, self.getConfig())
                    .then(
                        function (d) {
                            if (d.status == 200) {
                                if (d.data.locationActivities.length > 0) {
                                    _.each(d.data.locationActivities, function (item) {

                                            var date =  new Date(0);
                                            date.setUTCSeconds(item.plannedPublicTs);
                                        
                                            var time = dateFormat(date,"HH:MM");
                                        
                                        
                                            self.data.activities.push({
                                                location: locationsService.getLocation(item.locationDocId),
                                                type: item.plannedActivity,
                                                time: time
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

        service.loadAllData = function loadAllData(trainId) {
            var self = this;
            var deferred = $q.defer();
            self.data.trainId = trainId;
            self.data.activities = [];
            self.loadData()
                .then(function (d) {
                    deferred.resolve(self.data);
                })
            return deferred.promise;
        }

        service.getActivities = function getActivities() {
            return this.data.activities;
        }
        
        service.clear = function clear(){
            this.data.activities.length=0;
            this.data.isLoaded = false;
            this.data.busy = false;
        }

        service.isLoaded = function isLoaded() {
            return this.data.isLoaded;
        }

        service.isBusy = function isBusy(){
            return this.data.busy;
        }

        service.getConfig = function getConfig() {
            return {
                headers: {
                    Accept: 'application/json'
                }
            };
        }
        
        service.getNextStop = function(location, journey){
            
            var id = location.id;
            var nextStop = {};
            nextStop.name = "";
            nextStop.time = "";
            
            _.forEach(journey.activities, function (item) {

                if(item.location.id == id){
                   nextStop.name = item.location.locationName;
                   nextStop.time = item.time;
                    
                }
            });
            return nextStop;
        }
        
        
        return service;
    }
    
})();