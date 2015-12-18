(function() {

  'use strict';

  angular.module('realtimeChat').controller('LoginController', ['$scope',
  '$http', '$localStorage', '$state', '$mdToast', '$document',
  function($scope, $http, $localStorage, $state, $mdToast, $document) {

    $scope.loginUser = function() {
      $http.post('/api/users/login', $scope.user)
      .then(function(response) {
        $localStorage.token = response.data.token;
        $state.go('chat');
      }, function(error) {
        if (error.status == 400) {
          $mdToast.show($mdToast.simple().textContent(error.data[0])
          .position('top right')
          .parent($document[0].querySelector('#toastBounds'))
          .hideDelay(5000));
        }
      });
    };

    $scope.openSignupPage = function() {
      $state.go('signup');
    };

  }]);
})();
