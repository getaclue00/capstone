import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    closeModal() {
      this.transitionToRoute('employees');
    },
    saveEmployee() {
      var self = this;
      this.get('model').save().then(() => {
        self.transitionToRoute('employees');
      });
    }
  }
});
