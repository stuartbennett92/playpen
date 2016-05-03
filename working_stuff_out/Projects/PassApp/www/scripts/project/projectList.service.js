(function () {
    'use strict';

    angular
        .module('basicapp.project')
        .factory('ProjectService', ProjectService);

    ProjectService.$inject = [];
    function ProjectService(){ 
        
        var projectList = [];
        var storage = 'projectListStorage';
        var selected = '';

        // Get a list from localStorage OR Create a new list
        if (window.localStorage.getItem(storage) != null) {
            //found a list in storage >> getting.
            projectList = angular.fromJson(window.localStorage.getItem(storage));
            //check all projects referenced in list still exist
            projectList.CheckProjectsExist;
        }
        
        projectList.Store = function () { 
            //save our list of projects to storage.
            window.localStorage[storage] = angular.toJson(projectList, 2);
        } 

        projectList.CheckProjectsExist = function() {
            //for each item in list, check the guid as a key in storage
            // and ensure item isn't null. if it's null, delete.
            angular.forEach(projectList, function(project) {
                if(window.localStorage.getItem[project.guid] === null) {
                    projectList.Delete(project.guid);
                }
            });
        }
        
        projectList.GenerateGUID = function() {
            var guid = '';
            /*
            var fresh = false;
            
            while (fresh === false) {
            //a check to make sure our guid is not used */
                guid = uuid.v4(); /*
                if (window.localStorage.getItem[guid] === null)
                {
                    fresh = true;
                }
            } */
            return guid;
        }
        
        projectList.IsAProject = function(obj) { 
            //check our obj-Object is a project
            var isProject = true;
            //check it's a project by ensuring all attributes are defined by not being null
            if (obj.name === undefined){ isProject = false; }
            if (obj.attributes === undefined){ isProject = false; }
            if (obj.style === undefined){ isProject = false; }
            //if (obj.dataSets === null){ isProject = false; }
            
            return isProject;
        }
        
        projectList.NameIsFresh = function(name) {
            //check our array for objects with name==name 
            //(used to make sure no projects have same name) 
            var isFresh = true;
            angular.forEach(projectList, function(project) {
            
                if (project.name == name){
                    isFresh = false;
                }

            });
            return isFresh;
        }
        
        projectList.Create = function(project) {
            var guid = projectList.GenerateGUID();
            
            //Create in store
            window.localStorage[guid] = angular.toJson(project);
            //Add to list
            projectList.push({'name': project.name, 'guid': guid});
            
            projectList.Store();
        }
        
        projectList.ReturnIndexOf = function(guid) {
            //Finds where in the array this item is 
            //(used for updating and deleting)
            var index = -1;
            var counter = 0;

            angular.forEach(projectList, function(project) {
                if (project.guid == guid){
                    index = counter;
                    return;
                }
                counter++;
            });
            if (index == -1) {
                console.log("no project with that guid - index="+index);                
            } else {
                return index;    
            }
        }
        
        projectList.ReturnSelected = function() {
            if(selected == ''){
                console.log("none selected yet");
            } else {
                return selected;
            }
        }
        
        projectList.UpdateSelectedWith = function(updatedProject) {
            var index = projectList.ReturnIndexOf(selected);
            
            //update in store
            window.localStorage[selected] = angular.toJson(updatedProject, 2);
            //update in list
            (projectList[index]).name = updatedProject.name;
            //projectList[index] = {'name': updatedProject.name, 'guid': selected};
            
            projectList.Store();
        }
        
        projectList.Delete = function(guid) {
            var index = projectList.ReturnIndexOf(guid);
            
            //remove from list
            projectList.splice(index, 1);
            //nullify in storage
            window.localStorage.removeItem(guid);
            
            projectList.Store();
        }
        
        projectList.Select = function(guid) {
            selected = guid;
        }
    
        return projectList;
    }
})();