import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    let id = params.appointments_id;
    return RSVP.hash({
      appointment: this.get('store').findRecord('appointment', id),
      services: this.get('store').findAll('service'),
      employees: this.get('store').findAll('employee'),
      clients: this.get('store').findAll('client'),
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  },

actions: {
  willTransition() {
      // check if any attributes have been changed
      let appointment = this.get('controller.appointment');
      let modalId = this.get('controller.stringThatIsUsedForModalIdInTemplate');

      if (appointment.get('hasDirtyAttributes')) {
        // remove any changes since they would be commited via Save button
        // this would be a good place to prompt user to see if they want to save the changes
        appointment.rollbackAttributes();
      }
      Ember.$(`#${modalId}`).modal('hide');
    },

    goBackToCalendar() {
      this.transitionTo('my-calendar');
    }
  }
});
