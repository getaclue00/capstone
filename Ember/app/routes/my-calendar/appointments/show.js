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
      let appointment = this.get('controller.appointment');
      let modalId = this.get('controller.stringThatIsUsedForModalIdInTemplate');

      if (appointment.get('hasDirtyAttributes')) {
        appointment.rollbackAttributes();
      }

      Ember.$(`#${modalId}`).modal('hide');
    }
  }
});
