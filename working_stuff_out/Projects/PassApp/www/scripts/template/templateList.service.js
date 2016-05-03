(function () {
    'use strict';

    angular
        .module('basicapp.template')
        .factory('TemplateService', TemplateService);

    TemplateService.$inject = [];
    function TemplateService(){
        
        //template refence array
        var templateList = [];
        //t is my templateTemplate
        var t = '';
        
        //Get or Create our tRef list in storage
        if (window.localStorage.getItem("templateList") === null) {
            
            window.localStorage["templateList"] = angular.toJson(templateList, 2);
        } 
        else {
            
            templateList = angular.fromJson(window.localStorage.getItem("templateList"));
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
        templateList.rtnTemplateByName = function(name){
            var theTemplate = {};
            
            angular.forEach(templateList, function(template) {
                
                if (template.name == name){
                    angular.copy(template, theTemplate);
                    return theTemplate;
                }
            });
            if (theTemplate == {}) {
                console.log("no template with that name");                
            } else {
                return theTemplate;    
            }
        }
        
        templateList.rtnIndexByName = function(name){
            var index = -1;
            var counter = 0;
            
            angular.forEach(templateList, function(template) {
                
                if (template.name == name){
                    index = counter;
                    return;
                }
                counter++;
            });
            if (index == -1) {
                console.log("no template with that name");                
            } else {
                return index;    
            }
        }
        
        //Update: set existing object in storage (overwrite) 
        templateList.updateTemplate = function(index, template) {
            
            angular.copy(template, templateList[index]);
            //save
            templateList.toStorage();
        }
        
        //Delete: remove templates from list
        templateList.removeTemplate = function(v) {
        
            //find template in list, then remove.
            var index = templateList.indexOf(v);
            templateList.splice(index, 1);
            
            //save
            templateList.toStorage();
            
        }
        
        templateList.returnLength = function () {

            return templateList.length;  
        }
        
        templateList.isEmpty = function () {
            //if 
        }
        
        templateList.select = function(name) {
            t = name;   
        }
        
        templateList.isSelected = function(name) {
            if (t == name) {
                return true;
            }
            else {
                return false;
            }
        }
        
        templateList.rtnSelected = function() {
            return (templateList.rtnTemplateByName(t));
        }
        
        templateList.updateSelected = function (newTemplate) {
            var index = -1;
            index = templateList.rtnIndexByName(t);
            templateList.updateTemplate(index, newTemplate); 
        }
        
        return templateList;
    }
})(); 