import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

moduleFor('controller:my-calendar/appointments/show', 'Unit | Controller | my calendar/appointments/show', {
});

test('#deleteAppointment transitionsTo my-calendar', function(assert) {
  var done = assert.async();
  const appointmentStub = Ember.Object.create({
    destroyRecord() {
      return RSVP.resolve();
    }
  });
  let ctrl = this.subject({
      appointment: appointmentStub,
      transitionToRoute(route) {
        assert.equal(route, 'my-calendar');
        done();
      }
  });

  ctrl.send('deleteAppointment');

  assert.ok(ctrl);
});

test('#deleteAppointment throws an error following a failed delete', function(assert) {
  const appointmentStub = Ember.Object.create({
    destroyRecord() {
      let errorMsg = { error: 'could not destroy a record' };
      return RSVP.reject(errorMsg);
    }
  });
  let ctrl = this.subject({
      appointment: appointmentStub
  });

  assert.throws(ctrl.send('deleteAppointment'), "throws with just a message, not using the 'expected' argument");
});

test('#saveAppointment transitionsTo my-calendar', function(assert) {
  var done = assert.async();
  const appointmentStub = Ember.Object.create({
    save() {
      return RSVP.resolve();
    }
  });
  let ctrl = this.subject({
      appointment: appointmentStub,
      transitionToRoute(route) {
        assert.equal(route, 'my-calendar');
        done();
      }
  });
  ctrl.send('saveAppointment');
  assert.ok(ctrl);
});

test('#saveAppointment throws an error following a failed update', function(assert) {
  const appointmentStub = Ember.Object.create({
    save() {
      let errorMsg = { error: 'could not destroy a record' };
      return RSVP.reject(errorMsg);
    }
  });
  let ctrl = this.subject({
      appointment: appointmentStub
  });
  assert.throws(ctrl.send('saveAppointment'), "throws with just a message, not using the 'expected' argument");
});
