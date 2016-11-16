import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);
    Ember.$('#myModal').modal('show');
  }
});
