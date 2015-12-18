(function() {

  'use strict';

  angular.module('realtimeChat').controller('HomeController', ['$scope',
  '$state', function($scope, $state) {
      $scope.openLoginPage = function() {
        $state.go('login');
      };
    }]);
})();
