import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

moduleFor('controller:services/show', 'Unit | Controller | services/show', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('#saveService transitions to services', function(assert) {
  var done = assert.async();
  const serviceStub = Ember.Object.create({
    save() {
      return RSVP.resolve();
    }
  });
  let ctrl = this.subject({
      model: serviceStub,
      transitionToRoute(route) {
        assert.equal(route, 'services');
        done();
      }
  });

  ctrl.send('updateService');
  assert.ok(ctrl);
});

test('#saveService throws an error following a failed update', function(assert) {
  const serviceStub = Ember.Object.create({
    save() {
      let errorMsg = { error: 'could not update a record' };
      return RSVP.reject(errorMsg);
    }
  });
  let ctrl = this.subject({
      model: serviceStub
  });

  assert.throws(ctrl.send('updateService'),
  	"throws with just a message, not using the 'expected' argument");

});
