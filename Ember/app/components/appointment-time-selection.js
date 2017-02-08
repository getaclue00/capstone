import Ember from 'ember';

export default Ember.Component.extend({
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
