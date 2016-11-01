import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    closeModal() {
      this.transitionToRoute('employees');
    }
  }
});
