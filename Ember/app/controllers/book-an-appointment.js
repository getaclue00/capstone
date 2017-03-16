import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  selectTime: false,
  selectEmployee: false,
  selectedDate: null,
  selectedTime: null,
  previousDescription: null,
  currentDate: moment().format('MM/DD/YYYY'),

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

    changeDateAction(date) {
      if (moment().format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD') || moment(date).isAfter(moment())) {
        this.set('selectedDate', moment(date, 'YYYY-MM-DD').format('MMMM D, YYYY'));
        this.set('selectTime', true);
      }
    },

    moveToNextPage(currentPage){
      Ember.$('#step-' + currentPage).hide();
      Ember.$('#li-' + currentPage).addClass('done');
      Ember.$('#li-' + currentPage).removeClass('active');
      Ember.$('#step-' + (currentPage + 1)).show();
      Ember.$('#li-' + (currentPage + 1)).addClass('active');
    },

    moveToPreviousPage(currentPage){
      Ember.$('#step-' + currentPage).hide();
      Ember.$('#li-' + currentPage).removeClass('active');
      Ember.$('#step-' + (currentPage - 1)).show();
      Ember.$('#li-' + (currentPage - 1)).addClass('active');
    },

    bookAppointment() {
      var self = this;
      var flashMessages = self.get('flashMessages');
      var appointment = self.get('appointment');
      var service = self.get('appointment.service');
      var client = self.get('client');
      var time = self.get('selectedTime');
      var date = self.get('selectedDate');
      var startTime = moment(date + " " + time,'MMMM D, YYYY h:mm A' ).format('YYYY-MM-DD HH:mm:ss');
      var endTime = moment(date + " " + moment(time, 'h:mm A').add(service.get('duration'), 'minutes').format('h:mm A')).format('YYYY-MM-DD HH:mm:ss');

      self.get('store').query('client', {
        filter: {
          email: client.get('email')
        }
      }).then(function(result) {
        var existingClient = result.get('firstObject');

        if(existingClient) {
          client = existingClient;
          saveAppointment();
        } else {
          var phoneNum = client.get('phoneNumber').match(new RegExp('.{1,4}$|.{1,3}', 'g')).join("-");
          client.set('phoneNumber', phoneNum);
          client.save().then(saveAppointment).catch(failure);
        }
      });

      function transitionToPost() {
        window.scrollTo(0,0);
        flashMessages.success('Appointment was booked');
      }

      function failure() {
        window.scrollTo(0,0);
        flashMessages.danger('Appointment was not successfully booked');
      }

      function saveAppointment(){

        self.get('appointment').set('client', client);
        self.get('appointment').set('cost', service.get('price'));
        self.get('appointment').set('location', client.get('address'));
        self.get('appointment').set('start', startTime);
        self.get('appointment').set('end', endTime);
        self.get('appointment').set('weekNumber', moment(date, 'MMMM D, YYYY').week());

        appointment.save().then(transitionToPost).catch(failure);
      }

    }
  }
});
