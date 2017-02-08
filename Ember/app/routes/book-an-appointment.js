import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  model() {
    return Ember.RSVP.hash({
      services: this.get('store').query('service', {
        filter: {
          displayable: true
        }
      })
    });
  },

  renderSmartWizard() {
    Ember.$('#smartwizard').smartWizard({
      reverseButtonsOrder: true,
    })
  },

  actions: {
    didTransition() {
      Ember.run.next(this, 'renderSmartWizard');
    }
  }
});

