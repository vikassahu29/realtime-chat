(function() {

  'use strict';

  var app = angular.module('realtimeChat', ['ui.router', 'btford.socket-io',
                          'ngMaterial', 'ngStorage']);
                          
  app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider

        .state('home', {
          url: '/',
          templateUrl: 'partial-home.html',
          controller: 'HomeController'
        })

        .state('login', {
          url: '/login',
          templateUrl: 'partial-login.html',
          controller: 'LoginController'
        })

        .state('chat', {
          url: '/chat',
          templateUrl: 'partial-chat.html',
          controller: 'ChatController'
        });

    }]);
})();
