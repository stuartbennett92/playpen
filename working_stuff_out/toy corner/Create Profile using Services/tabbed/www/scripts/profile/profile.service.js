(function () {
    'use strict';

    angular
        .module('app.profile')
        .factory('ProfileService', ProfileService);

    ProfileService.$inject = [];
    
    function ProfileService() {
        
        //create empty profile object
        var profile = 
        {
            "name": null,
            "site": null,
            "about": null        
        }
        
       //Locate or Create our profile data
       if (window.localStorage.getItem("ProfileData") === null) {
    
        window.localStorage["ProfileData"] = angular.toJson(profile, 2);
        
        //window.log("Profile Data Key created.");
        
        } else {
            profile.name = angular.fromJson(window.localStorage.getItem("ProfileData.name"));
            profile.site = angular.fromJson(window.localStorage.getItem("ProfileData.site"));
            profile.about = angular.fromJson(window.localStorage.getItem("ProfileData.about"));
        } 
        
        //Profile Save
        profile.save = function () {
            
            window.localStorage.setItem("ProfileData", JSON.stringify(profile));
        }
        
        //Profile GETS
        profile.getName = function() {  
            return profile.name;
        }
        profile.getSite = function() {  
            return profile.site;
        }
        profile.getAbout = function() {  
            return profile.about;
        }
        
        //Profile SETS
        profile.setName = function(newName) {  
            return profile.name = newName;
        }
        profile.setSite = function(newSite) {  
            return profile.site = newSite;
        }
        profile.setAbout = function(newAbout) {  
            return profile.about = newAbout;
        }
        
        
        
        return profile;
        
    }
})();