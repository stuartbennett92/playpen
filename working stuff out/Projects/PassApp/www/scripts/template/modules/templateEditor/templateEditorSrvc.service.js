(function () {
    'use strict';

    angular
        .module('basicapp.templateEditor')
        .factory('TemplateEditorSrvc', TemplateEditorSrvc);

    TemplateEditorSrvc.$inject = [
                                '$state',
                                'TemplateService'
                                ];
    
    function TemplateEditorSrvc(
                                $state, 
                                TemplateService
                                ) {
        
        var editorTemplate = {}
        var tempTemplate = {};
        
        // initialise obj
        editorTemplate.reset = function() {
            tempTemplate = {};
            angular.copy(TemplateService.rtnSelected(), tempTemplate);
            console.log(tempTemplate);
        }
        
        // building template
        editorTemplate.setName = function (newName) {
            tempTemplate.name = newName;
        }
        editorTemplate.getName = function () {
            return tempTemplate.name;
        }
        
        editorTemplate.getAttributes = function () {
            return tempTemplate.attributes;
        }
        editorTemplate.addAttribute = function (newAtt) {
            tempTemplate.attributes.push(newAtt);
        }
        editorTemplate.cullAttribute = function (attributeName) {
            var index = tempTemplate.attributes.indexOf(attributeName);
            tempTemplate.attributes.splice(index, 1);
        }
        
        editorTemplate.setStyle = function (style) {
            tempTemplate.style = style;
        }
        editorTemplate.getStyle = function () {
            return tempTemplate.style;
        }
        
        editorTemplate.rtnTemplate = function () {
            return tempTemplate;
        }
        
        /*
        editorTemplate.attributeDesc = function (Att, Desc) {
            
        }
        editorTemplate.setStyle = function (style) {
            
        } */
        
        // state machine
        var stateList = [
            'editTemplateName',
            'editTemplateAttributes',
            'editTemplateAttributeDescriptions',
            'editTemplateStyle',
            'editTemplatePreview'
            ];
        
        editorTemplate.moveOn = function(currentState) {
            
            var index = null;
            index = stateList.indexOf(currentState);
            if (index == null) {
                console.log("editorTemplate.moveOn - \"invalid state given\"");
                return;
            }
            $state.go(stateList[index+1]);
            
        }
        
        editorTemplate.goBack = function(currentState) {
            
            var index = null;
            index = stateList.indexOf(currentState);
            if (index == null) {
                console.log("editorTemplate.moveOn - \"invalid state given\"");
                return;
            }
            $state.go(stateList[index-1]);
        }
        
        editorTemplate.finish = function() {
            TemplateService.updateSelected(tempTemplate);
            $state.go('template');
        }
        
        editorTemplate.cancel = function() {
            editorTemplate.reset();
            $state.go('template');
        }
        
        
        editorTemplate.reset();
        return editorTemplate;
    }
})();