(function() {

  'use strict';

  angular.module('realtimeChat').factory('socket', ['socketFactory',
    function(socketFactory) {
      return socketFactory({
        prefix: '',
        isSocket: io.connect('/io')
      });
    }]);

})();
