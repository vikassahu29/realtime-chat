(function() {

  'use strict';

  angular.module('realtimeChat').controller('LoginController', ['$scope',
  '$http', '$localStorage', '$state',
  function($scope, $http, $localStorage, $state) {

    $scope.loginUser = function() {
      $scope.error = false;
      $http.post('/api/users/login', $scope.user)
      .then(function(response) {
        $localStorage.token = response.data.token;
        $state.go('chat');
      }, function(error) {
        if (error.status == 400) {
          $scope.error = true;
        }
      });
    };
  }]);
})();
