describe('Controllers', function(){
    var scope; //creaitng a variable to hold a mock of the scope.

    // load the controller's module
    beforeEach(module('starter.controllers'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new(); //assigning scope to our scope mock
        $controller('AccountCtrl', {$scope: scope}); //instantiating controller AccountCtrl with our mock scope
    }));

    // tests start here
    it('should have enabled friends to be true', function(){ 
        expect(scope.settings.enableFriends).toEqual(true); // checking our controllers setting 'enableFriends' == true.
    });
});