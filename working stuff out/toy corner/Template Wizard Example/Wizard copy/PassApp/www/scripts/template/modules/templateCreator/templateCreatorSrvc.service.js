(function () {
    'use strict';

    angular
        .module('basicapp.templateCreator')
        .factory('TemplateCreatorSrvc', TemplateCreatorSrvc);

    TemplateCreatorSrvc.$inject = [
                                '$state',
                                'TemplateService'
                                ];
    
    function TemplateCreatorSrvc(
                                $state, 
                                TemplateService
                                ) {
        
        var creatorTemplate = {};
        
        // initialise obj
        creatorTemplate.reset = function() {
            creatorTemplate.name = '';
            creatorTemplate.attributes = [];
            creatorTemplate.style = 10;
        }
        
        // building template
        creatorTemplate.setName = function (newName) {
            creatorTemplate.name = newName;
        }
        creatorTemplate.addAttribute = function (newAtt) {
            creatorTemplate.attributes.push(newAtt);
        }
        creatorTemplate.cullAttribute = function (attributeName) {
            var index = creatorTemplate.attributes.indexOf(attributeName);
            creatorTemplate.attributes.splice(index, 1);
        }
        creatorTemplate.attributeDesc = function (Att, Desc) {
            
        }
        creatorTemplate.setStyle = function (style) {
            
        }
        
        // state machine
        var stateList = [
            'createTemplateName',
            'createTemplateAttributes',
            'createTemplateAttributeDescriptions',
            'createTemplateStyle',
            'createTemplatePreview'
            ];
        
        creatorTemplate.moveOn = function(currentState) {
            
            var index = null;
            index = stateList.indexOf(currentState);
            if (index == null) {
                console.log("creatorTemplate.moveOn - \"invalid state given\"");
                return;
            }
            $state.go(stateList[index+1]);
            
        }
        
        creatorTemplate.goBack = function(currentState) {
            
            var index = null;
            index = stateList.indexOf(currentState);
            if (index == null) {
                console.log("creatorTemplate.moveOn - \"invalid state given\"");
                return;
            }
            $state.go(stateList[index-1]);
        }
        
        creatorTemplate.finish = function() {
            TemplateService.addTemplate(angular.copy(creatorTemplate));
            creatorTemplate.reset();
            $state.go('template');
        }
        
        creatorTemplate.cancel = function() {
            creatorTemplate.reset();
            $state.go('template');
        }
        
        
        creatorTemplate.reset();
        return creatorTemplate;
    }
})();