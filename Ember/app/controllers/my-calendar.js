import Ember from 'ember';

export default Ember.Controller.extend({
  viewName: 'month',
  businessHours: {
    // days of week. an array of zero-based day of week integers (0=Sunday)
    dow: [ 1, 2, 3, 4, 5 ], // Monday - Thursday

    start: '10:00', // a start time (10am in this example)
    end: '18:00', // an end time (6pm in this example)
  },

  actions: {
    changeView(view){
      this.set('viewName', view);
    },

    handleCalendarEventClick(calEvent, jsEvent, view) {
      console.error("handleCalendarEventClick - Not implemented");
    }
  }
});
