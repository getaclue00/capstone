import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:my-calendar/appointments/new', 'Unit | Controller | my calendar/appointments/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('#saveAppointment transitions to my-calendar', function(assert) {
  var done = assert.async(); //Tell QUnit to wait for the done() call inside the timeout.
  const ctrl = this.subject({
      appointment: Ember.Object.create({
      	save() {
          return new Ember.RSVP.Promise(function(resolve) {
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

test('#saveAppointment throws as error following a failed creation', function(assert) {
  let ctrl = this.subject({
      appointment: Ember.Object.create({
        save() {
          return new Ember.RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not create a record' });
          });
        }
      })
   });

  assert.throws(ctrl.send('saveAppointment'),
   "throws with just a message, not using the 'expected' argument");

});
