import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  selectTime: false,
  selectedDate: null,
  selectedTime: null,
  previousDescription: null,

  viewName: 'month',
  businessHours: {
    // days of week. an array of zero-based day of week integers (0=Sunday)
    dow: [ 1, 2, 3, 4, 5 ], // Monday - Thursday Friday

    start: '9:00', // a start time (10am in this example)
    end: '17:00',
  },
  header: {
    left:   'today',
    center: 'title',
    right:  'prev,next'
  },

  actions: {

    selectService(service) {
      if(!Ember.isEmpty(service)){
        this.get('appointment').set('service', service);
        Ember.$('.service-selection-btn').removeClass("active");
        Ember.$(event.target).addClass("active");
      }
    },

    handleCalendarDayClick(date) {
      if (moment().format('YYYY-MM-DD') === date.format('YYYY-MM-DD') || date.isAfter(moment())) {
        if(this.get('businessHours.dow').indexOf(parseInt(date.format('e'), 10)) > -1){
          this.set('selectedDate', moment(date, 'YYYY-MM-DD').format('MMMM D, YYYY'));
          this.set('selectTime', true);        }
      }
    }
  }
});