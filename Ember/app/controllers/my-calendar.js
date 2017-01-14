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
  calendarHeader2: {
    left:   '',
    center: '',
    right:  ''
  },
  tempEvents: Ember.A([{
    title: 'Event 1',
    start: '2017-01-08T07:08:08',
    end: '2017-01-08T09:08:08'
  },{
    title: 'Event 1',
    start: '2017-01-09T07:08:08',
    end: '2017-01-09T09:08:08'
  },{
    title: 'Event 1',
    start: '2017-01-09T10:08:08',
    end: '2017-01-09T12:08:08'
  },{
    title: 'Event 1',
    start: '2017-01-12T07:08:08',
    end: '2017-01-12T09:08:08'
  },{
    title: 'Event 2',
    start: '2017-01-13T07:08:08',
    end: '2017-01-13T09:08:08'
  }, {
    title: 'Event 3',
    start: '2017-01-15T07:08:08',
    end: '2017-01-15T09:08:08'
  }
  ]),

  events: Ember.computed('model.[]', function() {
    // Unfortunately, we need to do this conversion, until we can figure out why the model is not displayed without this conversion...

    let events = [];

    this.get('store').findAll('appointment').then((items) => {
      items.forEach((item) => {
        events.pushObject({
          id    : item.get('id'),
          title : item.get('title'),
          start : item.get('start'),
          end   : item.get('end'),
          color : item.get('color'),
          textColor: item.get('textColor')
        });
      });
    });

    return events;
  }),

  actions: {
    changeView(view){
      this.set('viewName', view);
    },

    handleCalendarEventClick(calEvent, jsEvent, view) {
      console.log("calEvent: ", calEvent);
      console.log("jsEvent: ", jsEvent);
      console.log("view: ", view);
      // console.error("handleCalendarEventClick - Not implemented");
      this.transitionToRoute('my-calendar.appointments.show', calEvent.id);
    },

    handleCalendarDayClick(date, jsEvent, view) {
      // console.log('Clicked on: ' + date.format());

      this.set('newAppointmentDate', date.format());

      console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

      console.log('Current view: ' + view.name);

      // Ember.$('#myModal').modal('show');
      this.transitionToRoute('my-calendar.appointments.new');
    }
  }
});
