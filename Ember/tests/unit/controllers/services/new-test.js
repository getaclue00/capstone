import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

moduleFor('controller:services/new', 'Unit | Controller | services/new', {
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

  ctrl.send('saveService');

  assert.ok(ctrl);
});

test('#saveService throws an error following a failed creation', function(assert) {
  let ctrl = this.subject({
      model: Ember.Object.create({
        save() {
          return new RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not create a record' });
          });
        }
      })
  });

  assert.throws(ctrl.send('saveService'),
  	"throws with just a message, not using the 'expected' argument");

});
