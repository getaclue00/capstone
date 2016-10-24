import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    console.warn(`params are not implemented yet, appointments_id: ${params.appointments_id}`);
    return this.get('store').createRecord('appointment');
  },

  actions: {
    goBackToCalendar() {
      this.transitionTo('my-calendar');
    },

    markAppointmentAsCompleted() {
      console.warn('markAppointmentAsCompleted is not implemented');
    },

    deleteAppointment() {
      console.warn('deleteAppointment is not implemented');
    }
  }
});
