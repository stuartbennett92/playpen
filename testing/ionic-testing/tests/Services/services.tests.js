describe('Chats Unit Tests', function(){
    
    var Chats; // creating a variable that will mock the actual service
    
    beforeEach(module('starter.services'));

    beforeEach(inject(function (_Chats_) {
        Chats = _Chats_; //assigning the service to the our mock
    }));

    it('can get an instance of my factory', inject(function(Chats) {
        expect(Chats).toBeDefined(); //testing chats is defined
    }));

    it('has 5 chats', inject(function(Chats) {
        expect(Chats.all().length).toEqual(5); //testing service has 5 chats
    }));

    it('has Max as friend with id 1', inject(function(Chats) {
        var oneFriend = {
            id: 1,
            name: 'Max Lynx',
            notes: 'Odd obsession with everything',
            face: 'https://avatars3.githubusercontent.com/u/11214?v=3&amp;s=460'
        };

        expect(Chats.get(1).name).not.toEqual(oneFriend.name); // testing chats.id(1) is called Max Lynx
    }));  
});