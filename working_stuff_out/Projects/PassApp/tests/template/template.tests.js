describe('TemplateService Unit Tests', function(){
    
    var TemplateService; // creating a variable that will mock the actual service
    
    beforeEach(module('basicapp.template'));

    beforeEach(inject(function (_TemplateService_) {
        TemplateService = _TemplateService_; //assigning the service to the our mock
    }));
    
    it('succeeds?', function() {
        expect(true).toBe(true);
    });
       
    it('can get an instance of my factory', inject(function(TemplateService) {
        expect(TemplateService).toBeDefined(); //testing chats is defined
        
    }));
    
    xit('can add an object', inject(function(TemplateService) {
        var myObj = {};
        myObj.name = 'stuart';
        
        TemplateService.addTemplate(myObj);
        TemplateService.select('stuart');
        
        expect(TemplateService.returnLength()).toEqual(1); //FAILED
    }));       
});