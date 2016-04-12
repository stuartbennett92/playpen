(function() {
	'use strict';

	angular
		.module('app.chat', [
			'ionic'
		])
    
        .config(function($stateProvider) {
            
            $stateProvider
                .state('tab.chats', {
                  url: '/chats',
                  views: {
                    'tab-chats': {
                      templateUrl: 'scripts/chat/chats.html',
                      controller: 'ListController as vm'
                    }
                  }
                })
                .state('tab.chat-detail', {
                  url: '/chats/:chatId',
                  views: {
                    'tab-chats': {
                      templateUrl: 'scripts/chat/detail/detail.html',
                      controller: 'DetailController as vm'
                    }
                  }
                })
            
		});
    

    
    
    
})();