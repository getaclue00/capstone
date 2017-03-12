import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return RSVP.hash({
      appointments: this.get('store').findAll('appointment'),
      services: this.get('store').findAll('service')
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  }
});
