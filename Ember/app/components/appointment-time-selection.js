import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({

  availableTimes: Ember.computed('params.[]', function(){
    var arrayTime = [];
    var start = this.get('businessHours.start');
    var end = this.get('businessHours.end');
    var timeDiff = moment(end,"HH:mm").diff(moment(start,"HH:mm"));
    var time = start;

    for(var i = 0 ; i < timeDiff; i+=1800000){

      arrayTime.push(moment(time, "HH:mm").format("HH:mm"));
      time = moment(time, "HH:mm").add(30, 'minutes');
    }

    return arrayTime;
  }),

  aSelectedEmployee: Ember.computed('model.employee', function(){
    return this.get('model.employee');
  }),

  wasEmployeeSelected: Ember.computed('model.employee', function(){
    let employee = this.get('model.employee');

    if (employee) {
      if (employee.get('firstName') && employee.get('lastName')) {
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

    resetForm(){
      this.get('model').set('employee', null);
      this.set('selectTime', false);
    },

    selectEmployee(employee) {
      if(!Ember.isEmpty(employee)){
        this.get('model').set('employee', employee);
      }
    },
  }
});
