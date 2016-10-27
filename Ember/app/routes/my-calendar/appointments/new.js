import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.get('store').createRecord('appointment', {
      start: new Date(),
      end: new Date()
    });
  },

  actions: {
    willTransition() {
      let model = this.controller.get('model');
      model.rollbackAttributes();
    },

    goBackToCalendar() {
      this.transitionTo('my-calendar');
    }
  }
});
