import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

const flashMessagesStub = Ember.Service.extend({
  danger(message) {
    this.set('calledWithMessage', message);
  }
});

moduleFor('controller:my-calendar/appointments/new', 'Unit | Controller | my calendar/appointments/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('#saveAppointment transitions to my-calendar', function(assert) {
  var done = assert.async(); //Tell QUnit to wait for the done() call inside the timeout.
  const appointmentStub = Ember.Object.create({
    save() {
      return RSVP.resolve();
    }
  });
  const ctrl = this.subject({
      appointment: appointmentStub,
      transitionToRoute(route) {
      	assert.equal(route, 'my-calendar');
      	done();
      }
  });

  ctrl.send('saveAppointment');
  assert.ok(ctrl);
});

test('#saveAppointment throws as error following a failed creation', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  let done = assert.async();
  const appointmentStub = Ember.Object.create({
    save() {
      return RSVP.reject();
    }
  });
  let ctrl = this.subject({
      appointment: appointmentStub
   });

  ctrl.send('saveAppointment');
  setTimeout(function() {
    assert.ok(ctrl);
    assert.deepEqual(ctrl.get('flashMessages.calledWithMessage'), 'Appointment was not successfully created', 'danger flashMessages fired');
    done();
  }, 500);
});
