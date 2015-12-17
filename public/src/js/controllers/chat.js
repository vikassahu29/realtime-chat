(function() {

  'use strict';

  angular.module('realtimeChat').controller('ChatController', ['$scope',
    'socket', '$localStorage', '$rootScope', function($scope, socket,
      $localStorage, $rootScope) {
      if ($localStorage.token) {
        $rootScope.$broadcast('authenticated');
      }

      $scope.messages = [];
      $scope.connected = false;
      socket.then(function(socket1) {
        $scope.connected = true;
        socket1.on('joined', function(data) {
          console.log(data);
        });

        socket1.on('message', function(data) {
          $scope.messages.push(data);
        });
      });

      $scope.sendMessage = function() {
        if ($scope.connected && $scope.newMessage !== undefined &&
          $scope.newMessage.length > 0) {
          socket.then(function(socket) {
            socket.emit('message', $scope.newMessage);
            $scope.newMessage = undefined;
          });
        }
      };

    }]);

})();
