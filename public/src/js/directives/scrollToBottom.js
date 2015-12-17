(function() {
  'use strict';

  angular.module('realtimeChat').directive('scrollToBottom', function() {
    return {
      scope: {
        list: '=scrollToBottom'
      },
      link: function(scope, element) {
        scope.$watchCollection('list', function() {
          element[0].scrollTop = element[0].scrollHeight;
        });
      }
    };
  });

})();
