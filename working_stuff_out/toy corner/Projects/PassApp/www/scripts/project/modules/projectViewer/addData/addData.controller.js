(function () {
    'use strict';

    angular
        .module('basicapp.projectViewer')
        .controller('ProjectAddDataCtrl', ProjectAddDataCtrl);

    ProjectAddDataCtrl.$inject = [
        '$state',
        'ProjectService'
        ];

    /* @ngInject */
    function ProjectAddDataCtrl(
        $state,
        ProjectService
        ) {
                                     
        var vm = angular.extend(this, {
            //nothing - just a project.
        });
        
        //CONTROLLER HERE
        vm.project = ProjectService.project;
        vm.style = ProjectService.project.style;
        
        //initialising dates
        vm.date =  new Date();
        
        
        vm.time = {};
        vm.time.hh = vm.date.getHours();
        if(vm.time.hh < 10){
            vm.time.mm = '0'+vm.time.hh;
        }
        vm.time.mm = vm.date.getMinutes();
        if(vm.time.mm < 10){
            vm.time.mm = '0'+vm.time.mm;
        }

        //initialising dataSet
        vm.datas = [];        
        angular.forEach(vm.project.attributes, function(value) {
            var obj = {
                        'attribute' : value.name,
                        'value' : 0
                    };
            
            vm.datas.push(obj)
        }, this);
        
        vm.dataSet = {};
        //wrapping up and sending off
        vm.wrapUp = function () {
            //formatting date
            vm.date.setHours(vm.time.hh);
            vm.date.setMinutes(vm.time.mm);
            vm.date.setSeconds(0);
            vm.date.setMilliseconds(0);
            
            vm.dataSet = {
                'date': vm.date,
                'data': vm.datas,
                'tag' : vm.tag
            };
            
            ProjectService.addDataSet(vm.dataSet);
            $state.go('projectViewer');
        }
    }
})();