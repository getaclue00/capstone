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
      employees: this.store.findAll('employee')
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  },

  actions: {
    willTransition() {
      let model = this.controller.get('appointment');
      model.rollbackAttributes();
    },

    goBackToCalendar() {
      this.transitionTo('my-calendar');
    }
  }
});
