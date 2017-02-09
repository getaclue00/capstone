import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import moment from 'moment';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  model() {

    let time = moment().format('YYYY-MM-DDTHH:mm');

    return Ember.RSVP.hash({
      appointment: this.get('store').createRecord('appointment', {
        start: time,
        end: time,
        weekNumber: Number(moment(time).format('w'))
      }),
      services: this.get('store').query('service', {
        filter: {
          displayable: true
        }
      }),
      employees: this.get('store').findAll('employee')
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  },


  renderSmartWizard() {
    Ember.$('#smartwizard').smartWizard({
      reverseButtonsOrder: true,
    });
  },

  actions: {
    didTransition() {
      Ember.run.next(this, 'renderSmartWizard');
    }
  }
});

