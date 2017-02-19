import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

moduleFor('controller:users/delete', 'Unit | Controller | users/delete', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checking type', function(assert) {
  assert.expect(1);
  const ctrl = this.subject();

  assert.equal(ctrl.get('type'), 'user', 'type properly set');
});


test('#deleteUser remains on employees page following a deletion', function(assert) {
  var done = assert.async();
  let controller = this.subject({
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
  controller.send('deleteUser');

  assert.ok(controller);
});

test('#deleteUser throws an error following a failed deletion', function(assert) {
  let controller = this.subject({
      model: Ember.Object.create({
        destroyRecord() {
          return new RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not destroy a record' });
          });
        }
      })
  });
  assert.throws(controller.send('deleteUser'), "throws with just a message, not using the 'expected' argument");

});
