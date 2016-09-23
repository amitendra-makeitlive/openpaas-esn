'use strict';

/* global chai: false */
var expect = chai.expect;

describe('The calendar module directives', function() {

  beforeEach(function() {
    module('jadeTemplates');
    angular.mock.module('linagora.esn.graceperiod', 'esn.calendar');
  });

  describe('calendarView directive', function() {
    beforeEach(function() {
      var self = this;

      this.calendarService = {
        listCalendars: function() {
          return $q.when([]);
        }
      };

      angular.mock.module('ui.calendar', function($provide) {
        $provide.constant('calendarService', self.calendarService);
        $provide.factory('miniCalendarMobileDirective', function() { return {}; });
        $provide.factory('eventCreateButtonDirective', function() { return {}; });
        $provide.factory('uiCalendarDirective', function() { return {}; });
      });
    });

    beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
      this.$compile = _$compile_;
      this.$rootScope = _$rootScope_;
      this.$scope = this.$rootScope.$new();
      this.$scope.uiConfig = {
        calendar: {}
      };

      this.initDirective = function(scope) {
        var element = this.$compile('<calendar-view ui-config="uiConfig"/>')(scope);

        element = this.$compile(element)(scope);
        scope.$digest();

        return element;
      };
    }));

    it('should broadcast "header:disable-scroll-listener" true', function(done) {
      this.$scope.$on('header:disable-scroll-listener', function(event, data) { // eslint-disable-line
        expect(data).to.be.true;
        done();
      });
      this.initDirective(this.$scope);
    });

    it('should broadcast "header:disable-scroll-listener" false on destroy', function(done) {
      this.$scope.$on('header:disable-scroll-listener', function(event, data) { // eslint-disable-line
        if (data) {
          return;
        } else {
          expect(data).to.be.false;
          done();
        }
      });
      this.initDirective(this.$scope);
      this.$scope.$destroy();
    });
  });
});
