import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);
    Ember.$('#employee-editor').modal('show');
  },

  willDestroyElement() {
    Ember.$('#employee-editor').modal('hide');
  }
});
