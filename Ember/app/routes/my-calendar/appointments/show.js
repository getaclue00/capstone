import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    let id = params.appointments_id;
    return this.get('store').findRecord('appointment', id);
  },

  actions: {
    goBackToCalendar() {
      this.transitionTo('my-calendar');
    },

    markAppointmentAsCompleted() {
      console.warn('markAppointmentAsCompleted is not implemented');
    }
  }
});
