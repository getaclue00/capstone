import Ember from 'ember';

export default Ember.Controller.extend({
  viewName: 'month',
  businessHours: {
    // days of week. an array of zero-based day of week integers (0=Sunday)
    dow: [ 1, 2, 3, 4, 5 ], // Monday - Thursday

    start: '10:00', // a start time (10am in this example)
    end: '18:00', // an end time (6pm in this example)
  },
  newAppointmentDate: '',

  actions: {
    changeView(view){
      this.set('viewName', view);
    },

    handleCalendarEventClick(calEvent, jsEvent, view) {
      console.log("calEvent: ");
      console.log(calEvent);
      console.log("jsEvent: ");
      console.log(jsEvent);
      console.log("view: ");
      console.log(view);
      console.error("handleCalendarEventClick - Not implemented");
      this.transitionToRoute('my-calendar.appointments.show', calEvent.id);
    },

    handleCalendarDayClick(date, jsEvent, view) {
      console.log('Clicked on: ' + date.format());

      this.set('newAppointmentDate', date.format());

      console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

      console.log('Current view: ' + view.name);

      // Ember.$('#myModal').modal('show');
      this.transitionToRoute('my-calendar.appointments.new');
    }
  }
});
