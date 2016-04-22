(function() {
	'use strict';

	angular
		.module('basicapp.templateEditor', [
			'ionic'
  
		])
		.config(function($stateProvider) {
        
            $stateProvider
            .state('editTemplateStart', {
                cache: false,
                url: '^/edit/name',
                templateUrl: 'scripts/template/modules/templateEditor/start/editorStart.html',
                controller: 'editTemplateStartCtrl as vm'
            })
            .state('editTemplateName', {
                cache: false,
                url: '^/edit/name',
                templateUrl: 'scripts/template/modules/templateEditor/name/editorName.html',
                controller: 'editTemplateNameCtrl as vm'
            })
            .state('editTemplateAttributes', {
                cache: false,
                url: '^/edit/attributes',
                templateUrl: 'scripts/template/modules/templateEditor/addAttribute/editorAddAttribute.html',
                controller: 'editTemplateAttributesCtrl as vm'
            })
            .state('editTemplateAttributeDescriptions', {
                cache: false,
                url: '^/edit/attribute-descriptions',
                templateUrl: 'scripts/template/modules/templateEditor/attributeDescription/editorAttributeDescription.html',
                controller: 'editTemplateAttributeDescriptionsCtrl as vm'
            })
            .state('editTemplateStyle', {
                cache: false,
                url: '^/edit/style',
                templateUrl: 'scripts/template/modules/templateEditor/chartStyle/editorChartStyle.html',
                controller: 'editTemplateStyleCtrl as vm'
            })
            .state('editTemplatePreview', {
                cache: false,
                url: '^/edit/preview',
                templateUrl: 'scripts/template/modules/templateEditor/preview/editorPreview.html',
                controller: 'editTemplatePreviewCtrl as vm'
            })
		});
})();