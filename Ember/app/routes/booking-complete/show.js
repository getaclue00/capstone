import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  showPage: false,
  model(params) {
    let id = params.appointments_id;
    return this.get('store').findRecord('appointment', id);
  },
  afterModel(appointment) {
    if(appointment.get('status')!=='pending') {
      window.location.href = "http://www.radetailing.ca/";
    } else {
      this.set('showPage', true);
    }
  },
  actions: {
    didTransition() {
      Ember.run.schedule('afterRender', this, () => {
        Ember.$('#navigation-menu').hide();
        if (this.get('showPage')) {
          Ember.$('#booking-complete-style').toggle();
        }
      });
    },

    goToBookingPage(id) {
      this.transitionTo('book-an-appointment.show', id);
    }
  }
});
