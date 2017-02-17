import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return Ember.RSVP.hash({
      serviceForSmallCars: this.get('store').query('service', {
        filter: {
          vehicle_size: "Small"
        }
      }),
      servicesForLargeVehicles: this.get('store').query('service', {
        filter: {
          vehicle_size: "Large"
        }
      })
    });
  }
});
