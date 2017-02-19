import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

moduleFor('controller:services/show', 'Unit | Controller | services/show', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('#saveService transitions to services', function(assert) {
  var done = assert.async();
  let ctrl = this.subject({
      model: Ember.Object.create({
        save() {
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

  ctrl.send('updateService');
  assert.ok(ctrl);
});

test('#saveService throws an error following a failed update', function(assert) {
  let ctrl = this.subject({
      model: Ember.Object.create({
        save() {
          return new RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not update a record' });
          });
        }
      })
  });

  assert.throws(ctrl.send('updateService'),
  	"throws with just a message, not using the 'expected' argument");

});
