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
      services: this.store.findAll('service')
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  },

  actions: {
    willTransition() {
      let model = this.controller.get('model');
      model.rollbackAttributes();
    },

    goBackToCalendar() {
      this.transitionTo('my-calendar');
    }
  }
});
