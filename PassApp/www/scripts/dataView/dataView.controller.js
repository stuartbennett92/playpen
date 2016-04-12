(function () {
    'use strict';

    angular
        .module('app.dataView')
        .controller('DataViewController', DataViewController);
   
       DataViewController.$inject = ['DataViewService'];
       
       
       /* Binding data to scope data */
       $scope.scopeData = DataViewService();
   
       function DataViewController(DataViewService) {
           var vm = angular.extend(this, {
               
           });
           
           vm.save = function save(data){
               DataViewService.add(data);
           }
        
       }
})();