import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({

  // startTime: moment('8:00 AM').format('HH:mm A'),
  // endTime: moment('5:00 PM').format('HH:mm A'),
  availableTimes: Ember.computed('params.[]', function(){
    var arrayTime = new Array();

    for(var i = 0; i < 5; i++){
       console.log("s");
      arrayTime.push(moment("123", "hmm").format("HH:mm"));
    }

    return arrayTime;

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
    }
  }
});
