import Ember from 'ember';

const { $, Controller, computed, isEmpty } = Ember;

export default Controller.extend({

  viewName: 'month',
  viewName2: 'listWeek',

  computedTotal: computed('model.[]', function() {
    const model = this.get('model');
    var sum = 0;
    if(model) {
      model.forEach(function(item) {
        let price = item.get('service.price_small') || item.get('service.price_large');
        sum += Number(price);
      });
      return `$${sum}`;
    } else {
      return undefined;
    }
  }),

  businessHours: {
    // days of week. an array of zero-based day of week integers (0=Sunday)
    dow: [ 1, 2, 3, 4, 5 ], // Monday - Thursday

    start: '10:00', // a start time (10am in this example)
    end: '18:00', // an end time (6pm in this example)
  },

  calendarHeader: {
    left:   'today',
    center: 'title',
    right:  'prev,next'
  },

  computedEvents: computed('model.[]', function() {
    let events = [];
    let model = this.get('model');

    model.forEach(function(item) {
      events.pushObject({
        id    : item.get('id'),
        title : 'Service',
        start : item.get('formattedStart'),
        end   : item.get('formattedEnd'),
        color : item.get('color'),
        textColor: item.get('textColor')
      });
    });

    return events;
  }),

  actions: {
    handleCalendarEventClick(calEvent) {
      this.transitionToRoute('my-calendar.appointments.show', calEvent.id);
    },

    handleCalendarDayClick(date, jsEvent) {
      var self = this;
      let week = date.week();
      let year = date.weekYear();

      let el = $('.fc-scroller.fc-day-grid-container').find('.selected-week');

      if (el) {
        el.removeClass('selected-week');
      }

      $(jsEvent.target).closest('.fc-row.fc-week.fc-widget-content').find('.fc-bg').addClass('selected-week');

      function successfulResponse(results) {
        if (!isEmpty(results)) {
          let events = [];

          results.forEach(function(item) {
            events.pushObject({
              id    : item.get('id'),
              start : item.get('formattedStart'),
              end   : item.get('formattedEnd'),
              color : item.get('color'),
              textColor: item.get('textColor')
            });
          });
          self.set('model', results);
          $('.week-view .full-calendar').fullCalendar( 'gotoDate', date );
          self.set('computedEvents', events);
        } else {
          self.set('model', undefined);
          $('.week-view .full-calendar').fullCalendar( 'gotoDate', date );
          self.set('computedEvents', []);
        }
      }

      self.get('store').query('appointment', {
        filter: {
          week: week,
          year: year
        }
      }).then(successfulResponse);
    }
  }
});
