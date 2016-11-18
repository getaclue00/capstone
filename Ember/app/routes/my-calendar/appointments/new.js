import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    let clickedDate = this.controllerFor('my-calendar').get('newAppointmentDate') || new Date();

    return Ember.RSVP.hash({
      appointment: this.get('store').createRecord('appointment', {
        start: new Date(clickedDate),
        end: new Date(clickedDate)
      }),
      services: this.get('store').findAll('service'),
      employees: this.get('store').findAll('employee')
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  },

  actions: {
    willTransition() {
      // check if any attributes have been changed
      let appointment = this.get('controller.appointment');

      if (appointment.get('hasDirtyAttributes')) {
        // remove any changes since they would be commited via Save button
        // this would be a good place to prompt user to see if they want to save the changes
        appointment.rollbackAttributes();
      }
    },

    goBackToCalendar() {
      this.transitionTo('my-calendar');
    }
  }
});
