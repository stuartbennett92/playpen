describe('ProjectService Unit Tests', function(){
    
    //Clearing localStorage as it remains after each test, causing next test to fail.
    //window.localStorage.clear(); 
    
    // creating a variable that will mock the actual service
    var ProjectService; 
    
    beforeEach(module('basicapp.projectViewer'));

    beforeEach(inject(function (_ProjectService_) {
        ProjectService = _ProjectService_; //assigning the service to the our mock
    }));
    
    var project = {};
    var dataSet = {};
    
    beforeEach(inject(function(ProjectService) {
        project = {
            'name' : 'project1',
            'attributes' : [
                {'name':'attribute1',
                    'desc':'att-description'},
                {'name':'attribute2',
                    'desc':'att-desc two!'}
            ],
            'style' : '10',
            'dataSets': []
        };
        
        dataSet = {
            'date':'2016-03-25T12:00:00',
            'data': [
                {'attribute':'myattribute',
                'value' : '7'},
                {'attribute': 'myAttribute2',
                    'value' : '1'}
            ],
            'tag':'myFirstDataSet'
        };    
        
        window.localStorage.setItem('key', angular.toJson(project));
        ProjectService.getProject('key');
        
    }))
    
    
    it('succeeds?', function() { //this should ALWAYS succeed!!
        expect(true).toBe(true);
    });
    
    it('can get projects exactly as they were stored', inject(function(ProjectService) {
        
        expect(ProjectService.project).toEqual(project);
    }));
    
    it('can get the amount of dataSets in project and also add dataSets', inject(function(ProjectService) {
        //ProjectService.getProject('key');
        
        expect(ProjectService.project.dataSets).toBeDefined;
        expect((ProjectService.project.dataSets).length).toEqual(0);
        
        ProjectService.addDataSet(dataSet);
        expect((ProjectService.project.dataSets).length).toEqual(1);
        //LOG:  Object{ name: 'project1', attributes: [Object{name: ..., desc: ...}, Object{name: ..., desc: ...}],
        //              style: '10', dataSets: [Object{date: ..., time: ..., data: ..., tag: ...}]}
    }));
    
    it('adds dataSets in date order!', inject(function(ProjectService) {
        //ProjectService.getProject('key');
        
        var dataSet2 = {
            'date':'2042-03-13T12:00:01',
            'data': [
                {'attribute':'myattribute',
                'value' : '7'},
                {'attribute': 'myAttribute2',
                    'value' : '1'}
            ],
            'tag':'DataSet2'
        };
        var dataSet3 = {
            'date':'1997-03-25T11:59:59',
            'data': [
                {'attribute':'myattribute',
                'value' : '7'},
                {'attribute': 'myAttribute2',
                    'value' : '1'}
            ],
            'tag':'DataSet3'
        };
        expect(ProjectService.project.dataSets).toBeDefined;
        
        ProjectService.addDataSet(dataSet);
        ProjectService.addDataSet(dataSet2);
        ProjectService.addDataSet(dataSet3);
        
        expect(ProjectService.project.dataSets[0]).toEqual(dataSet2);
        expect(ProjectService.project.dataSets[1]).toEqual(dataSet);
        expect(ProjectService.project.dataSets[2]).toEqual(dataSet3);
    
    }));

    it('can delete dataSets', inject(function(ProjectService) {
        var dataSet2 = {
            'date':'2042-03-13T12:00:01',
            'data': [
                {'attribute':'myattribute',
                'value' : '7'},
                {'attribute': 'myAttribute2',
                    'value' : '1'}
            ],
            'tag':'DataSet2'
        };
        var dataSet3 = {
            'date':'1997-03-25T11:59:59',
            'data': [
                {'attribute':'myattribute',
                'value' : '7'},
                {'attribute': 'myAttribute2',
                    'value' : '1'}
            ],
            'tag':'DataSet3'
        };
        
        ProjectService.addDataSet(dataSet);
        ProjectService.addDataSet(dataSet2);
        ProjectService.addDataSet(dataSet3);
        
        expect((ProjectService.project.dataSets).length).toEqual(3);
        
        ProjectService.deleteDataSet(dataSet2);
        expect((ProjectService.project.dataSets).length).toEqual(2);
        
    }));    

}); 

/* mock items

var project = 
{
    'name' : 'project1',
    'attributes' : [
        {'name':'attribute1',
            'desc':'att-description'},
        {'name':'attribute2',
            'desc':'att-desc two!'}
    ],
    'style' : '10',
    'dataSets': []
};

var dataSet = 
{
    'date':'14/04/2016',
    'time':'12:05:11',
    'data': [
        {'attribute':'myattribute',
         'value' : '7'},
        {'attribute: 'myAttribute2',
         'value : '1'}
    ],
    'tag':'myFirstDataSet'
}


*/