import Ember from 'ember';

export default Ember.Controller.extend({
  selectTime: false,
  selectedDate: null,
  viewName: 'month',

  businessHours: {
    // days of week. an array of zero-based day of week integers (0=Sunday)
    dow: [ 1, 2, 3, 4, 5 ], // Monday - Thursday

    start: '10:00', // a start time (10am in this example)
    end: '18:00', // an end time (6pm in this example)
  },

 header: {
    left:   'today',
    center: 'title',
    right:  'prev,next'
  },

  actions: {
    handleCalendarDayClick(date, jsEvent, view) {
      this.set('selectedDate', date.format());
      this.set('selectTime', true);

    }
  }
});