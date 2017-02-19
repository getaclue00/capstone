import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

moduleFor('controller:services/delete', 'Unit | Controller | services/delete', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checking type', function(assert) {
  assert.expect(1);
  const ctrl = this.subject();

  assert.equal(ctrl.get('type'), 'service', 'type properly set');
});

test('#deleteServices deletes and redirects to services page', function(assert) {
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
        assert.equal(route, 'services');
        done();
      }
  });
  controller.send('deleteService');

  assert.ok(controller);
});

test('#deleteService throws an error following a failed deletion', function(assert) {
  let controller = this.subject({
      model: Ember.Object.create({
        destroyRecord() {
          return new RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not destroy a record' });
          });
        }
      })
    });
  assert.throws(controller.send('deleteService'),
   "throws with just a message, not using the 'expected' argument");
});
