import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:clients/new', 'Unit | Controller | clients/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('#saveClient transitions to clients', function(assert) {
  var done = assert.async();
  let ctrl = this.subject({
      model: Ember.Object.create({
        save() {
          return new Ember.RSVP.Promise(function(resolve) {
            resolve(true);
          });
        }
      }),
      transitionToRoute(route) {
        assert.equal(route, 'clients');
        done();
      }
  });

  ctrl.send('saveClient');

  assert.ok(ctrl);
});

test('#saveClient throws an error following a failed creation', function(assert) {
  let ctrl = this.subject({
      model: Ember.Object.create({
        save() {
          return new Ember.RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not create a record' });
          });
        }
      })
  });

  assert.throws(ctrl.send('saveClient'), 
  	"throws with just a message, not using the 'expected' argument");

});