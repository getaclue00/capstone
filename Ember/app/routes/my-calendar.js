import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';
 import moment from 'moment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return RSVP.hash({
      appointments: this.get('store').query('appointment', {
        filter: {
          week: moment().week(),
          year: moment().year()
        }
      }),
      services: this.get('store').findAll('service')
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  }
});
