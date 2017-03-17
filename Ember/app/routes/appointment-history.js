import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  ajax: Ember.inject.service(),

  model(params) {
    let id = params.appointments_id;
    return this.get('ajax').request(`http://localhost:3000/appointments?version%5Bid%5D=`+id).then(result => {
      return result.appointments;
    });
  }
});

