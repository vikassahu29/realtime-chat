(function() {

  'use strict';

  angular.module('realtimeChat').controller('SignUpController', ['$scope',
  '$http', '$state', '$mdToast', '$document',
  function($scope, $http, $state, $mdToast, $document) {

    $scope.signupUser = function() {
      $http.post('/api/users', $scope.user)
      .then(function(response) {
        $scope.signUpComplete = true;
        $scope.name = response.data.name;
      }, function(error) {
        if (error.status == 400) {
          $mdToast.show($mdToast.simple().textContent(error.data[0])
          .position('top right')
          .parent($document[0].querySelector('#toastBounds'))
          .hideDelay(5000));
        }
      });
    };
  }]);
})();
