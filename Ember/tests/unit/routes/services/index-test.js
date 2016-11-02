import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:services/index', 'Unit | Route | services/index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});


test('#deleteService remains on services page following a deletion', function(assert) {
  let controller = this.subject({
      model: Ember.Object.create({
        destroyRecord() {
          return new Ember.RSVP.Promise(function(resolve) {
            resolve(true);
          });
        }
      }),
      transitionToRoute(route) {
        assert.equal(route, 'services');
      }
  });
  controller.send('deleteService');

  assert.ok(controller);
});

test('#deleteService remains on services page following a failed deletion', function(assert) {
  let controller = this.subject({
      model: Ember.Object.create({
        destroyRecord() {
          return new Ember.RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not destroy a record' });
          });
        }
      }),
      transitionToRoute(route) {
        assert.equal(route, 'services');
      }
  });
  assert.throws(controller.send('destroyRecord'), "throws with just a message, not using the 'expected' argument");

});
