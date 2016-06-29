(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$cordovaEmailComposer'];
    
    function mainCtrl($cordovaEmailComposer) {
        var vm = angular.extend(this, {
        });
        //controller
        
        vm.data = {"name":"My Project","attributes":[{"name":"Confidence","desc":""},{"name":"Progress","desc":""},{"name":"Quality of Work","desc":""},{"name":"Enjoyment","desc":""}],"style":10,"dataSets":[{"date":"2016-06-27T10:04:40.132Z","data":[{"attribute":"Confidence","value":"1"},{"attribute":"Progress","value":"1"},{"attribute":"Quality of Work","value":"1"},{"attribute":"Enjoyment","value":"1"}],"tag":"latest"},{"date":"2016-06-27T10:27:35.733Z","data":[{"attribute":"Confidence","value":"4"},{"attribute":"Progress","value":"4"},{"attribute":"Quality of Work","value":"7"},{"attribute":"Enjoyment","value":"4"}]}]};

        vm.open = function() {

            vm.data = {"name":"My Project","attributes":[{"name":"Confidence","desc":""},{"name":"Progress","desc":""},{"name":"Quality of Work","desc":""},{"name":"Enjoyment","desc":""}],"style":10,"dataSets":[{"date":"2016-06-27T10:04:40.132Z","data":[{"attribute":"Confidence","value":"1"},{"attribute":"Progress","value":"1"},{"attribute":"Quality of Work","value":"1"},{"attribute":"Enjoyment","value":"1"}],"tag":"latest"},{"date":"2016-06-27T10:27:35.733Z","data":[{"attribute":"Confidence","value":"4"},{"attribute":"Progress","value":"4"},{"attribute":"Quality of Work","value":"7"},{"attribute":"Enjoyment","value":"4"}]}]};
            vm.name = vm.data.name;
            vm.data = btoa(JSON.stringify(vm.data)); //encode


            document.addEventListener('deviceready', function () {
            $cordovaEmailComposer.isAvailable().then(function() {
            var email = {
                    to: 'bennettstuart92@gmail.com',
                    cc: '',
                    bcc: [],
                    attachments: ['base64:'+vm.name+'.wheels//'+vm.data],
                    subject: 'My Wheels project',
                    body: 'Sending my Wheels project from my Wheels App #Wheelsapp'
                };

                $cordovaEmailComposer.open(email).then(null, function () {
                alert('Email cancelled');
                });
                }, function () {
                    alert('You do not have an email client set up.');
                });
            }, false);
        }
    }
})();