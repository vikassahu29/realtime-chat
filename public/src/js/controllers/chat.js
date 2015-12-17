(function() {

  'use strict';

  angular.module('realtimeChat').controller('ChatController', ['$scope',
    'socket', function($scope, socket) {
      $scope.messages = [];

      socket.on('joined', function(data) {
        console.log(data);
      });

      socket.on('message', function(data) {
        $scope.messages.push(data);
      });

      $scope.sendMessage = function() {
        if ($scope.newMessage !== undefined && $scope.newMessage.length > 0) {
          socket.emit('message', $scope.newMessage);
          $scope.newMessage = undefined;
        }
      };

    }]);

})();
