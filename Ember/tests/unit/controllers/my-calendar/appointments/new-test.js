import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

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
  const appointmentStub = Ember.Object.create({
    save() {
      let errorMsg = { error: 'could not create a record' };
      return RSVP.reject(errorMsg);
    }
  });
  let ctrl = this.subject({
      appointment: appointmentStub
   });

  assert.throws(ctrl.send('saveAppointment'),
   "throws with just a message, not using the 'expected' argument");
});
