import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({

  availableTimes: null,

  aSelectedEmployee: Ember.computed('appointment.employee', function(){
    return this.get('appointment.employee');
  }),

 didInsertElement() {
    this._super(...arguments);
    Ember.$('#appointment-time-selection').modal('show');
  },

  willDestroyElement() {

    Ember.$('#appointment-time-selection').modal('hide');
  },

  actions: {

    cancelSelection() {
      this.set('selectEmployee', false);
      this.set('selectTime', false);
    },

    confirmSelection(time) {
      this.set('selectedTime', time);
      this.set('selectTime', false);
      this.set('selectEmployee', false);
      Ember.$('#move-to-information-input').removeAttr('disabled');
    },

    selectEmployee(employee) {
      if(!Ember.isEmpty(employee)){
        this.get('appointment').set('employee', employee);
        var self = this;
        var dayOfTheWeek = moment(self.get('selectedDate')).format('dddd');
        self.get('store').query('company-preference', {
          filter: {
            employee_id: self.get('appointment.employee.id')
          }
        }).then(function(result) {
          var arrayTime = [];
          var employeeStart = result.get('firstObject').get(dayOfTheWeek.toLowerCase() + "Open");
          var employeeEnd = result.get('firstObject').get(dayOfTheWeek.toLowerCase() + "Close");
          var timeDiff = moment(employeeEnd,"h:mm a").diff(moment(employeeStart,"h:mm a"));
          var time = employeeStart;

          for(var i = 0 ; i < timeDiff; i+=1800000){
            arrayTime.push(moment(time, "h:mm a").format("h:mm a"));
            time = moment(time, "h:mm a").add(30, 'minutes');
          }

          self.set('availableTimes', arrayTime);
          self.set('selectEmployee', true);
        });
      }
    },
  }
});
