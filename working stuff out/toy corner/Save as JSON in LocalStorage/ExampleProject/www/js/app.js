// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
 var exampleApp = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
 
 exampleApp.controller("ExampleController", function($scope, $ionicPopup) {
    
    //variable to hold our objects
    
    $scope.data = [];//var data = [];
    var objectToStore = {};
    $scope.myObject = {name: '', type:'A'};
    $scope.showError = false;
    
    // check to see if data exists, if so use it, else create new dataset 
    if (window.localStorage.getItem("stuartsData") === null) {
    
        window.localStorage.setItem("stuartsData", "");
        window.localStorage["stuartsData"] = angular.toJson($scope.data, 2);
        
    } else {
        $scope.data = angular.fromJson(window.localStorage.getItem("stuartsData"));
    }
    
    
     
     //save objects to localstorage
     $scope.saveData = function() {
                     //turn data(array) into JSON then store into into object.
            objectToStore = angular.toJson($scope.data, 2);
            //save the JSONified objectToStore into localStorage at key"stuartsData".
            window.localStorage.setItem("stuartsData", objectToStore);
     }
     
     
     //add new data to 'data'- my object variable
     $scope.addData = function(newData) {
         
         //if name empty - do nothing
         if(newData.name == ''){
             
            showError = true;
 
         } else { // if name not empty - proceed addData
             
            showError = false;
            
            $scope.data.push({
                name: newData.name,
                type: newData.type
            });
            
           $scope.saveData();
            
            //reset object that was used to default
            newData.name = '';
            newData.type = 'A';
 
            
         }
     }
     
     
     $scope.editData = function(v) {
         
         $scope.editObj = {};//v.clone();
         angular.copy(v, $scope.editObj);
         
         var myPopup = $ionicPopup.show({
             template: 
             '<input ng-model="editObj.name" placeholder="obj name 1"><label class="item item-input item-select" ><div class="input-label">Object type</div><select ng-model="editObj.type"><option>A</option><option>B</option><option>C</option></select></label>',
             title: 'Edit this Object',
             subTitle: 'Click save to overwrite the object with new data',
             scope: $scope,
             buttons: [
                 { text: 'Cancel'},
                 {
                     text: '<b>Save</b>',
                     type: 'button-positive',
                     onTap: function(e) {
                         if($scope.editObj.name === '') {
                             //dont save obj's with empty name
                             e.preventDefault();
                         } else {
                             angular.copy($scope.editObj, v);
                             $scope.saveData();
                             return;
                         }
                     }
                 }
             ]
             
         });
         console.log($scope.editObj);
     }
     
     
     $scope.removeData = function(v) {
         
        //remove this data from the array and save array.
         
        var index = $scope.data.indexOf(v);
        $scope.data.splice(index, 1)
        
        $scope.saveData();
         
     }
   
   
 });