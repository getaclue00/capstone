import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import moment from 'moment';
import RSVP from 'rsvp';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    let time = moment().format('YYYY-MM-DDTHH:mm');

    return RSVP.hash({
      appointment: this.get('store').createRecord('appointment', {
        start: time,
        end: time,
        weekNumber: Number(moment(time).format('w'))
      }),
      services: this.get('store').findAll('service'),
      employees: this.get('store').findAll('employee'),
      clients: this.get('store').findAll('client')
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
    }
  }
});
