(function() {

  'use strict';

  angular.module('realtimeChat').controller('ToolbarController', ['$scope',
  '$state', function($scope, $state) {
    $scope.openLoginPage = function() {
      $state.go('login');
    };
  }]);
})();
