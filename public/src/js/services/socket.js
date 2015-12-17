(function() {

  'use strict';

  angular.module('realtimeChat').factory('socket', ['socketFactory', '$q',
  '$rootScope', '$timeout', '$localStorage', function(socketFactory, $q,
    $rootScope, $timeout, $localStorage) {
    var socket = $q.defer();

    $rootScope.$on('authenticated', function() {
      $timeout(function() {
        var newSocket = (function() {
          return socketFactory({
            prefix: '',
            ioSocket: io.connect('', {
              query: 'token=' + $localStorage.token,
              path: '',
              forceNew: true
            })
          });
        })();
        socket.resolve(newSocket);
      });
    });

    return socket.promise;
  }]);

})();
