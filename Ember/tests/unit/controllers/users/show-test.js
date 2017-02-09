import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:users/show', 'Unit | Controller | users/show', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:flash-messages'],
  beforeEach() {
    //We have to register any types we expect to use in this component
    const typesUsed = ['danger', 'success'];
    Ember.getOwner(this).lookup('service:flash-messages').registerTypes(typesUsed);
  }
});

test('#updateUser transitions to employees', function(assert) {
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
        assert.equal(route, 'employees');
        done();
      }
  });

  ctrl.send('updateUser');

  assert.ok(ctrl);
});

test('#updateUser throws an error following a failed update', function(assert) {
  let controller = this.subject({
      model: Ember.Object.create({
        save() {
          return new Ember.RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not update a record' });
          });
        }
      })
  });

  assert.throws(controller.send('updateUser'), "throws with just a message, not using the 'expected' argument");

});

