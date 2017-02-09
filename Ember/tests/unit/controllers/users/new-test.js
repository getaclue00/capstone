import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:users/new', 'Unit | Controller | users/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:flash-messages'],
  beforeEach() {
    //We have to register any types we expect to use in this component
    const typesUsed = ['danger', 'success'];
    Ember.getOwner(this).lookup('service:flash-messages').registerTypes(typesUsed);
  }
});

test('#createUser transitions to employees', function(assert) {
  var done = assert.async();
  let controller = this.subject({
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

  controller.send('createUser');

  assert.ok(controller);
});

test('#createUser throws an error following a failed creation', function(assert) {
  let ctrl = this.subject({
      model: Ember.Object.create({
        save() {
          return new Ember.RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not create a record' });
          });
        }
      })
  });
  
  assert.throws(ctrl.send('createUser'), "throws with just a message, not using the 'expected' argument");

});

