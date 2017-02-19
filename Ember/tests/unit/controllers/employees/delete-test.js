import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

moduleFor('controller:employees/delete', 'Unit | Controller | employees/delete', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checking type', function(assert) {
  assert.expect(1);
  const ctrl = this.subject();

  assert.equal(ctrl.get('type'), 'employee', 'type properly set');
});



test('#deleteEmployee deletes and redirects to employees page', function(assert) {
  var done = assert.async(); //Tell QUnit to wait for the done() call inside the timeout.
  const ctrl = this.subject({
      model: Ember.Object.create({
        destroyRecord() {
          return new RSVP.Promise(function(resolve) {
            resolve(true);
          });
        }
      }),
      transitionToRoute(route) {
      	assert.equal(route, 'employees');
      	done();
      }
  });

  ctrl.send('deleteEmployee');
  assert.ok(ctrl); //passes if first argument is T
});



test('#deleteEmployee throws an error following a failed deletion', function(assert) {
  const ctrl = this.subject({
      model: Ember.Object.create({
        destroyRecord() {
          return new RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not destroy a record' });
          });
        }
      })
  });
  assert.throws(ctrl.send('deleteEmployee'),
    "throws with just a message, not using the 'expected' argument");
});
