(function() {

  'use strict';

  var app = angular.module('realtimeChat', ['ui.router', 'btford.socket-io',
                          'ngMaterial']);
  app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider

        .state('home', {
          url: '/',
          templateUrl: 'partial-home.html',
          controller: 'HomeController'
        })

        .state('chat', {
          url: '/chat',
          templateUrl: 'partial-chat.html',
          controller: 'ChatController'
        });

    }]);
})();
