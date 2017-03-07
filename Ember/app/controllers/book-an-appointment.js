import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
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
        Ember.$('.service-selection-btn').removeClass('active');
        Ember.$(event.target).addClass("active");
        Ember.$('#move-to-date-selection').removeAttr('disabled');
      }
    },

    handleCalendarDayClick(date) {
      if (moment().format('YYYY-MM-DD') === date.format('YYYY-MM-DD') || date.isAfter(moment())) {
        if(this.get('businessHours.dow').indexOf(parseInt(date.format('e'), 10)) > -1){
          this.set('selectedDate', moment(date, 'YYYY-MM-DD').format('MMMM D, YYYY'));
          this.set('selectTime', true);        }
      }
    },

    bookAppointment() {
      var self = this;
      var flashMessages = self.get('flashMessages');
      var appointment = self.get('appointment');
      var service = self.get('appointment.service');
      var client = self.get('client');
      var time = self.get('selectedTime');
      var date = self.get('selectedDate');
      var duration = self.get('appointment.service.duration');

      var startTime = moment(date + " " + time,'MMMM D, YYYY h:mm A' ).format('YYYY-MM-DD HH:mm:ss');
      var endTime = moment(date + " " + moment(time, 'h:mm A').add(duration, 'minutes').format('h:mm A')).format('YYYY-MM-DD HH:mm:ss');
      client.save().then(saveAppointment).catch(failure);


      function transitionToPost() {
        flashMessages.success('Appointment was booked');
      }

      function failure() {
        window.scrollTo(0,0);
        flashMessages.danger('Appointment was not successfully created');
      }

      function saveAppointment(){

        self.get('appointment').set('client', client);
        self.get('appointment').set('status', 'pending');
        self.get('appointment').set('start', startTime);
        self.get('appointment').set('end', endTime);
        self.get('appointment').set('weekNumber', moment(date, 'MMMM D, YYYY').week());

        appointment.save().then(transitionToPost).catch(failure);
      }

    }
  }
});
