describe('ProjectListService Unit Tests', function(){
    
    //Clearing localStorage as it remains after each test, causing next test to fail.
    window.localStorage.clear(); 
    
    // creating a variable that will mock the actual service
    var ProjectListService; 
    
    beforeEach(module('basicapp.project'));

    beforeEach(inject(function (_ProjectListService_) {
        ProjectListService = _ProjectListService_; //assigning the service to the our mock
    }));
    
    it('succeeds?', function() { //this should ALWAYS succeed!!
        expect(true).toBe(true);
    });
       
    it('can get an instance of my factory', inject(function(ProjectListService) {
        expect(ProjectListService).toBeDefined(); //testing our sevice is defined
        
    }));     
    
    it('has a list saved in storage, regardles if empty or not', inject(function(ProjectListService) {
       expect(window.localStorage['projectListStorage']).not.toEqual(null);  
    }));
    
    it('can generate GUIDs', inject(function(ProjectListService) {
        expect(ProjectListService.GenerateGUID()).not.toEqual(null);
    }));

    it('can check objects for if they are projects or not.', inject(function(ProjectListService) {
        var project = {
          'name': 'project1',
          'attributes': [
              'att1',
              'att2',
          ],
          'style': '10'  
        };
        var notproj = {
          'name': 'project1',
          'style': '10'  
        };
        expect(ProjectListService.IsAProject(project)).toEqual(true);
        expect(ProjectListService.IsAProject(notproj)).toEqual(false);
    }));
    
    it('can add projects to both the list and storage', inject(function(ProjectListService) {
        
        var project = {
          'name': 'project1',
          'attributes': [
              'att1',
              'att2',
          ],
          'style': '10'
       }; 
       
       expect(ProjectListService.length).toEqual(0);
       
       ProjectListService.Create(project);
       
       expect(ProjectListService.length).toEqual(1);
       
    }));
    
    it('can find objects by guid in the list and return the index', inject(function(ProjectListService) {
        var proj1 = {'name': 'proj1', 'guid': '112345678'};
        var proj2 = {'name': 'proj2', 'guid': '212345678'};
        var proj3 = {'name': 'proj3', 'guid': '312345678'};
        
        
        ProjectListService.push(proj1);
        ProjectListService.push(proj2);
        ProjectListService.push(proj3);
        
        ProjectListService.Store();
        
        expect(ProjectListService.ReturnIndexOf('212345678')).toEqual(2);
    }));
    
    it('deletes objects form both the list and storage', inject(function(ProjectListService) {
        var project = {}
        angular.copy(ProjectListService[0], project);
        expect(project.guid).not.toEqual(null);
        var previouslength = ProjectListService.length;
        ProjectListService.Delete(project.guid);
        expect(ProjectListService.length).toEqual(previouslength - 1);
        
        //after item has been removed from 
        expect(angular.fromJson(window.localStorage.getItem[project.guid])).not.toBeDefined;
    }));
    
    it('can select and return the selected GUID', inject(function(ProjectListService) {
        ProjectListService.Select((ProjectListService[2]).guid);
        
        expect(ProjectListService.ReturnSelected()).toEqual((ProjectListService[2]).guid);
    }));
    
    it('can check for name is in use', inject(function(ProjectListService) {
        var project = {
            'name': 'project123'
        }
        
        ProjectListService.Create(project);
        
        expect(ProjectListService.NameIsFresh('project123')).toEqual(false);
        expect(ProjectListService.NameIsFresh('thisisastupidnameforaproject')).toEqual(true);
    }));
    
    it('can update the selected project with new project Object in both list and storage', inject(function(ProjectListService) {
        ProjectListService.Select((ProjectListService[0]).guid);
        
        var newProject = {
            'name' : 'myProject',
            'attributes': [
                'atttttt',
                'atttt214114',                
            ],
            'style': '3'
        }
        
        ProjectListService.UpdateSelectedWith(newProject);
        expect((ProjectListService[0]).name).toEqual('myProject');
        
        expect(angular.fromJson(window.localStorage.getItem(ProjectListService.ReturnSelected()))).toEqual(newProject);
    }));
}); 