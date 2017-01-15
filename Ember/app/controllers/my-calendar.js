import Ember from 'ember';

export default Ember.Controller.extend({
  // TO REMOVE::::
  // moment().format('W') ==> to get week number
  // TO REMOVE::::

  viewName: 'month',
  viewName2: 'listWeek',
  businessHours: {
    // days of week. an array of zero-based day of week integers (0=Sunday)
    dow: [ 1, 2, 3, 4, 5 ], // Monday - Thursday

    start: '10:00', // a start time (10am in this example)
    end: '18:00', // an end time (6pm in this example)
  },
  newAppointmentDate: '',
  calendarHeader: {
    left:   'today',
    center: 'title',
    right:  'prev,next'
  },

  // events: Ember.computed('model.[]', function() {
  //   // Unfortunately, we need to do this conversion, until we can figure out why the model is not displayed without this conversion...
  //
  //   let events = [];
  //
  //   this.get('store').findAll('appointment').then((items) => {
  //     items.forEach((item) => {
  //       events.pushObject({
  //         id    : item.get('id'),
  //         title : item.get('title'),
  //         start : item.get('start'),
  //         end   : item.get('end'),
  //         color : item.get('color'),
  //         textColor: item.get('textColor')
  //       });
  //     });
  //   });
  //
  //   return events;
  // }),

  computedEvents: Ember.computed('model.[]', function() {
    let events = [];
    let model = this.get('model');

    model.forEach(function(item) {
      events.pushObject({
        id    : item.get('id'),
        title : 'Service',
        start : item.get('start'),
        end   : item.get('end'),
        color : item.get('color'),
        textColor: item.get('textColor')
      });
    });

    return events;
  }),

  actions: {
    changeView(view){
      this.set('viewName', view);
    },

    handleCalendarEventClick(calEvent) {
      this.transitionToRoute('my-calendar.appointments.show', calEvent.id);
    },

    handleCalendarDayClick(date) {
      var self = this;
      let week = date.week();
      let year = date.weekYear();

      function successfulResponse(results) {
        // TO REMOVE::::
        // Current problem... we fetch the new week but the calendar listview does not change to the corresponding week... thus need to figure out how to change the week view without having the header there
        // TO REMOVE::::
        if (!Ember.isEmpty(results)) {
          let events = [];

          results.forEach(function(item) {
            events.pushObject({
              id    : item.get('id'),
              start : item.get('start'),
              end   : item.get('end'),
              color : item.get('color'),
              textColor: item.get('textColor')
            });
          });
          self.get('model', undefined);
          console.log('current model: ', self.get('model'));
          self.set('model', results);
          // console.log('current model: ', self.get('model'));
          // debugger;
          self.set('computedEvents', events);
        } else {
          self.set('computedEvents', []);
        }
      }

      self.get('store').query('appointment', {
        filter: {
          week: week,
          year: year
        }
      }).then(successfulResponse);

      console.log('date: ', date);
      console.log('week number: ', week);
    }
  }
});
