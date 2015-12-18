(function() {

  'use strict';

  angular.module('realtimeChat').controller('ToolbarController', ['$scope',
  '$state', '$rootScope', '$localStorage',
  function($scope, $state, $rootScope, $localStorage) {

    $rootScope.$on('authenticated', function() {
      $scope.loggedIn = true;
    });

    $scope.logoutUser = function() {
      $localStorage.$reset();
      $scope.loggedIn = false;
      $state.go('home');
    };

    $scope.openLoginPage = function() {
      $state.go('login');
    };
  }]);
})();
