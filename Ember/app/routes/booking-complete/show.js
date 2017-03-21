import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  model(params) {
    let id = params.appointments_id;
    return this.get('store').findRecord('appointment', id);
  },
  afterModel(appointment) {
    console.log(appointment.get('status'));
    if(appointment.get('status')!='pending') {
      window.location.href = "http://www.radetailing.ca/";;
    }
  },
  actions: {
    didTransition() {
      Ember.run.schedule('afterRender', this, () => {
        Ember.$('#navigation-menu').hide();
      });
    }
  }
});
