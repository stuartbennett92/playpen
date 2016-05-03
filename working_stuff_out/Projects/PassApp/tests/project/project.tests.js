describe('ProjectService Unit Tests', function(){
    
    //Clearing localStorage as it remains after each test, causing next test to fail.
    window.localStorage.clear(); 
    
    // creating a variable that will mock the actual service
    var ProjectService; 
    
    beforeEach(module('basicapp.project'));

    beforeEach(inject(function (_ProjectService_) {
        ProjectService = _ProjectService_; //assigning the service to the our mock
    }));
    
    it('succeeds?', function() { //this should ALWAYS succeed!!
        expect(true).toBe(true);
    });
       
    it('can get an instance of my factory', inject(function(ProjectService) {
        expect(ProjectService).toBeDefined(); //testing our sevice is defined
        
    }));     
    
    it('has a list saved in storage, regardles if empty or not', inject(function(ProjectService) {
       expect(window.localStorage['projectListStorage']).not.toEqual(null);  
    }));
    
    it('can generate GUIDs', inject(function(ProjectService) {
        expect(ProjectService.GenerateGUID()).not.toEqual(null);
    }));

    it('can check objects for if they are projects or not.', inject(function(ProjectService) {
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
        expect(ProjectService.IsAProject(project)).toEqual(true);
        expect(ProjectService.IsAProject(notproj)).toEqual(false);
    }));
    
    it('can add projects to both the list and storage', inject(function(ProjectService) {
        
        var project = {
          'name': 'project1',
          'attributes': [
              'att1',
              'att2',
          ],
          'style': '10'
       }; 
       
       expect(ProjectService.length).toEqual(0);
       
       ProjectService.Create(project);
       
       expect(ProjectService.length).toEqual(1);
       
    }));
    
    it('can find objects by guid in the list and return the index', inject(function(ProjectService) {
        var proj1 = {'name': 'proj1', 'guid': '112345678'};
        var proj2 = {'name': 'proj2', 'guid': '212345678'};
        var proj3 = {'name': 'proj3', 'guid': '312345678'};
        
        
        ProjectService.push(proj1);
        ProjectService.push(proj2);
        ProjectService.push(proj3);
        
        ProjectService.Store();
        
        expect(ProjectService.ReturnIndexOf('212345678')).toEqual(2);
    }));
    
    it('deletes objects form both the list and storage', inject(function(ProjectService) {
        var project = {}
        angular.copy(ProjectService[0], project);
        expect(project.guid).not.toEqual(null);
        var previouslength = ProjectService.length;
        ProjectService.Delete(project.guid);
        expect(ProjectService.length).toEqual(previouslength - 1);
        
        //after item has been removed from 
        expect(angular.fromJson(window.localStorage.getItem[project.guid])).not.toBeDefined;
    }));
    
    it('can select and return the selected GUID', inject(function(ProjectService) {
        ProjectService.Select((ProjectService[2]).guid);
        
        expect(ProjectService.ReturnSelected()).toEqual((ProjectService[2]).guid);
    }));
    
    it('can check for name is in use', inject(function(ProjectService) {
        var project = {
            'name': 'project123'
        }
        
        ProjectService.Create(project);
        
        expect(ProjectService.NameIsFresh('project123')).toEqual(false);
        expect(ProjectService.NameIsFresh('thisisastupidnameforaproject')).toEqual(true);
    }));
    
    it('can update the selected project with new project Object in both list and storage', inject(function(ProjectService) {
        ProjectService.Select((ProjectService[0]).guid);
        
        var newProject = {
            'name' : 'myProject',
            'attributes': [
                'atttttt',
                'atttt214114',                
            ],
            'style': '3'
        }
        
        ProjectService.UpdateSelectedWith(newProject);
        expect((ProjectService[0]).name).toEqual('myProject');
        
        expect(angular.fromJson(window.localStorage.getItem(ProjectService.ReturnSelected()))).toEqual(newProject);
    }));
}); 