import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({

  availableTimes: Ember.computed('params.[]', function(){
    var arrayTime = new Array();

    for(var i = 0; i < 5; i++){
       console.log("s");
      arrayTime.push(moment("123", "hmm").format("HH:mm"));
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

    toggleSelectTime(){
      this.set('selectTime', false);
    },

    selectEmployee(employee) {
      if(!Ember.isEmpty(employee)){
        this.get('model').set('employee', employee);
      }
    },
  }
});
