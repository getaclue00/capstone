import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  session: service(),

  actions: {
    invalidateSession() {
      console.error("Not implemented in controllers/application");
    }
  }
});
