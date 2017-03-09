import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import moment from 'moment';
import RSVP from 'rsvp';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  model() {

    let time = moment().format('YYYY-MM-DDTHH:mm');

    return RSVP.hash({
      appointment: this.get('store').createRecord('appointment', {
        start: time,
        end: time,
        weekNumber: Number(moment(time).format('w'))
      }),
      client: this.get('store').createRecord('client', {

      }),
      smallVehicleServices: this.get('store').query('service', {
        filter: {
          displayable: true,
          vehicle_size: "Small"
        }
      }),
      largeVehicleServices: this.get('store').query('service', {
        filter: {
          displayable: true,
          vehicle_size: "Large"
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
      keyNavigation: false,
      toolbarSettings: {
        toolbarPosition: 'none'
      }
    });
  },

  enablePopovers () {

    // Initialized popovers
    Ember.$("a[rel=popover]").popover().click(function(e) {
      e.preventDefault();
    });

    // Ensure they close when page is clicked
    Ember.$(document).on('click', function (e) {
      Ember.$('[data-toggle="popover"]').each(function () {

        if (!Ember.$(this).is(e.target) && Ember.$(this).has(e.target).length === 0 && Ember.$('.popover').has(e.target).length === 0) {
            ((Ember.$(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false;
        }

      });
    });
  },

  actions: {
    didTransition() {
      Ember.run.next(this, 'renderSmartWizard');
      Ember.run.next(this, 'enablePopovers');
    }
  }
});

