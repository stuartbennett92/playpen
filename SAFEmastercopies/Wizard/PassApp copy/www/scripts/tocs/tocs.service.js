(function () {
    'use strict';

    angular
        .module('basicapp.tocs')
        .factory('tocsService', tocsService);

    tocsService.$inject = ['$q', '_', 'isambard'];

    /* @ngInject */
    function tocsService($q, _, isambard) {

        var service = {
                data:  {
                        page: 0,
                        isLoaded: false,
                        busy: false,
                        tocs: [],
                        idToTocMap: {}
                        },            
        };

        service.loadData = function loadData() {
            
            var deferred = $q.defer();
            var self = this;

            function loadAll() {
                self.data.busy = true;
                isambard.getTocs(self.getConfig(self.data.page + 1))
                    .then(
                        function (d) {
                            if (d.status == 200) {
                                if (d.data.list.length > 0) {
                                    _.each(d.data.list, function (item) {
                                        self.data.tocs.push({
                                            id: item.id,
                                            companyName: item.companyName,
                                            companyCode: item.companyCode,
                                            logoImageUrl: item.logoImageUrl,
                                            id:item.id
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
            self.data.tocs = [];
            self.loadData()
                .then(function (d) {
                    self.data.idToTocMap = _.keyBy(self.data.tocs, 'id');
                    deferred.resolve(self.data);
                })
            return deferred.promise;
        }

        service.getTocs = function getTocs() {
            return this.data.tocs;
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


        service.getToc = function getToc(tocId) {
            return this.data.idToTocMap[tocId];
        }
        
        return service;
    }
    
})();