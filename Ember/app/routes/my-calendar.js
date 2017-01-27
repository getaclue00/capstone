import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    const appointments = this.get('store').findAll('appointment');
    if (appointments) {
      return appointments;
    } else {
      return [];
    }
  }
});
