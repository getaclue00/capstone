import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

moduleFor('controller:my-calendar/appointments/show', 'Unit | Controller | my calendar/appointments/show', {
});

test('#deleteAppointment transitionsTo my-calendar', function(assert) {
  var done = assert.async();
  let ctrl = this.subject({
      appointment: Ember.Object.create({
        destroyRecord() {
          return new RSVP.Promise(function(resolve) {
            resolve(true);
          });
        }
      }),
      transitionToRoute(route) {
        assert.equal(route, 'my-calendar');
        done();
      }
  });

  ctrl.send('deleteAppointment');

  assert.ok(ctrl);
});

test('#deleteAppointment throws an error following a failed delete', function(assert) {
  let ctrl = this.subject({
      appointment: Ember.Object.create({
        destroyRecord() {
          return new RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not destroy a record' });
          });
        }
      })
  });

  assert.throws(ctrl.send('deleteAppointment'), "throws with just a message, not using the 'expected' argument");
});

test('#saveAppointment transitionsTo my-calendar', function(assert) {
  var done = assert.async();
  let ctrl = this.subject({
      appointment: Ember.Object.create({
        save() {
          return new RSVP.Promise(function(resolve) {
            resolve(true);
          });
        }
      }),
      transitionToRoute(route) {
        assert.equal(route, 'my-calendar');
        done();
      }
  });
  ctrl.send('saveAppointment');
  assert.ok(ctrl);
});

test('#saveAppointment throws an error following a failed update', function(assert) {
  let ctrl = this.subject({
      appointment: Ember.Object.create({
        save() {
          return new RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not update a record' });
          });
        }
      })
  });
  assert.throws(ctrl.send('saveAppointment'), "throws with just a message, not using the 'expected' argument");
});
