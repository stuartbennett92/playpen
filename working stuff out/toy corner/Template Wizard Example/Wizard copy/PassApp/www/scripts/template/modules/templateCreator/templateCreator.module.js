(function() {
	'use strict';

	angular
		.module('basicapp.templateCreator', [
			'ionic'
  
		])
		.config(function($stateProvider) {
        
            $stateProvider
            .state('createTemplateName', {
                cache: false,
                url: '^/create/name',
                templateUrl: 'scripts/template/modules/templateCreator/name/creatorName.html',
                controller: 'createTemplateNameCtrl as vm'
            })
            .state('createTemplateAttributes', {
                cache: false,
                url: '^/create/attributes',
                templateUrl: 'scripts/template/modules/templateCreator/addAttribute/creatorAddAttribute.html',
                controller: 'createTemplateAttributesCtrl as vm'
            })
            .state('createTemplateAttributeDescriptions', {
                cache: false,
                url: '^/create/attribute-descriptions',
                templateUrl: 'scripts/template/modules/templateCreator/attributeDescription/creatorAttributeDescription.html',
                controller: 'createTemplateAttributeDescriptionsCtrl as vm'
            })
            .state('createTemplateStyle', {
                cache: false,
                url: '^/create/style',
                templateUrl: 'scripts/template/modules/templateCreator/chartStyle/creatorChartStyle.html',
                controller: 'createTemplateStyleCtrl as vm'
            })
            .state('createTemplatePreview', {
                cache: false,
                url: '^/create/preview',
                templateUrl: 'scripts/template/modules/templateCreator/preview/creatorPreview.html',
                controller: 'createTemplatePreviewCtrl as vm'
            })
		});
})();