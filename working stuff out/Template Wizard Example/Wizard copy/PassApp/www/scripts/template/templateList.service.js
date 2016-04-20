(function () {
    'use strict';

    angular
        .module('basicapp.template')
        .factory('TemplateService', TemplateService);

    TemplateService.$inject = [];
    
/*
Service to :
save objects into storage,
 remove/delete templates,
  Get templates, 
  set templates(overwrite)

This service creates an object array; TemplateReferenceList, 
and creates multiple template objects, that are also linked into the reference list.
*/
    
    function TemplateService() {
        
        //template refence array
        var templateList = [];
        //t is my templateTemplate
        var t = {};
        t.name = "";
        t.attributes = [];
        t.style = "10";
        t.creator = "";
        
        //Get or Create our tRef list in storage
        if (window.localStorage.getItem("templateList") === null) {
            
            window.localStorage["templateList"] = angular.toJson(templateList, 2);
        } 
        else {
            
            templateList = angular.fromJson(window.localStorage.getItem("templateList"));
        }
        
        //clear template object
        t.clear = function() {
            t.name = "";
            t.attributes = [];
            t.style = "10";
            t.creator = "";  
        }
        
        //Store: save in storage.
        templateList.toStorage = function() {
            
            window.localStorage["templateList"] = angular.toJson(templateList, 2); 
        }
        
        //Create: create a new template by adding it to the list
        templateList.addTemplate = function(template) {
            
            templateList.push(template);
            //save
            templateList.toStorage();
        }
        
        //Read: return a readable list
        templateList.returnTemplate = function(){
            
            var readList = [];
            
            angular.forEach(templateList, function(template) {
                
                template.name
                // pass read object into read object list
                readList.push(readTemplate);
            });
            
            return readList;
        }
        
        //Read: specific template identified by name
        
        //Update: set existing object in storage (overwrite) 
        templateList.updateTemplate = function(index, template) {
            
            templateList[index] = template
            //save
            templateList.toStorage();
        }
        
        //Delete: remove templates from list
        templateList.removeTemplate = function(v) {
        
            //find template in list, then remove.
            var index = templateList.indexOf(v);
            templateList.splice(index, 1)
            
            //save
            templateList.toStorage();
            
        }
        
        templateList.returnLength = function () {
            return templateList.length();
        }
        
       templateList.isEmpty = function () {
            //if 
        }
        
        return templateList;
    }
})();