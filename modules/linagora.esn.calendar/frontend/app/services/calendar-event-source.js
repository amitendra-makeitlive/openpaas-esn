(function() {
  'use strict';

  angular.module('esn.calendar')
         .factory('calendarEventSource', calendarEventSource);

  calendarEventSource.$inject = [
    '$log',
    'calEventService'
  ];

  function calendarEventSource($log, calEventService) {
    return function(calendarPath, errorCallback) {
      return function(start, end, timezone, callback) {
        $log.debug('Getting events for %s', calendarPath);

        return calEventService.listEvents(calendarPath, start, end, timezone).then(
          function(events) {
            callback(events.filter(function(calendarShell) {
              return !calendarShell.status || calendarShell.status !== 'CANCELLED';
            }));
          }, function(err) {
            callback([]);
            $log.error(err);
            if (errorCallback) {
              errorCallback(err, 'Can not get calendar events');
            }
          });
      };
    };
  }

})();
