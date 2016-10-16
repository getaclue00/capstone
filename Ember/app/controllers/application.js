import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  session: service(),

  actions: {
    invalidateSession() {
      this.get("session").invalidate();
    }
  }
});
