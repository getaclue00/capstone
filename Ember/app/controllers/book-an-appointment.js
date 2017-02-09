import Ember from 'ember';

export default Ember.Controller.extend({
  selectTime: false,
  selectedDate: null,

  viewName: 'month',
  businessHours: {
    // days of week. an array of zero-based day of week integers (0=Sunday)
    dow: [ 1, 2, 3, 4, 5 ], // Monday - Thursday Friday

    start: '10:00', // a start time (10am in this example)
    end: '18:00',
  },
  header: {
    left:   'today',
    center: 'title',
    right:  'prev,next'
  },

  actions: {
    handleCalendarDayClick(date, jsEvent, view) {
      if (moment().format('YYYY-MM-DD') === date.format('YYYY-MM-DD') || date.isAfter(moment())) {
        if(this.get('businessHours.dow').indexOf(parseInt(date.format('e'), 10)) > -1){
          this.set('selectedDate', moment(date, 'YYYY-MM-DD').format('MMMM D, YYYY'));
          this.set('selectTime', true);
        }
      } else {
        // Else part is for past dates
      }
    }
  }
});
