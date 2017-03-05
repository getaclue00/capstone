import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({

  availableTimes: Ember.computed('availableTimes', function(){
    var arrayTime = [];
    var start = this.get('businessHours.start');
    var end = this.get('businessHours.end');
    var timeDiff = moment(end,"h:mm A").diff(moment(start,"h:mm A"));
    var time = start;

    for(var i = 0 ; i < timeDiff; i+=1800000){

      arrayTime.push(moment(time, "h:mm A").format("h:mm A"));
      time = moment(time, "h:mm A").add(30, 'minutes');
    }

    return arrayTime;
  }),

  aSelectedEmployee: Ember.computed('appointment.employee', function(){
    return this.get('appointment.employee');
  }),

  wasEmployeeSelected: Ember.computed('appointment.employee', function(){
    let employee = this.get('appointment.employee');

    if (employee) {
      if (employee.get('fullName')) {
        return true;
      }
    } else {
      return false;
    }
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
      this.get('appointment').set('employee', null);
      this.set('selectTime', false);
    },

    confirmSelection(time) {
      this.set('selectedTime', time);
      this.set('selectTime', false);
      Ember.$('#move-to-information-input').removeAttr('disabled');
    },

    selectEmployee(employee) {
      if(!Ember.isEmpty(employee)){
        this.get('appointment').set('employee', employee);
      }
    },
  }
});
