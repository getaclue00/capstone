import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:users/new', 'Unit | Controller | users/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('#createUser transitions to employees', function(assert) {
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
      }
  });

  controller.send('createUser');

  assert.ok(controller);
});

test('#createUser will NOT transition to employees', function(assert) {
  let controller = this.subject({
      model: Ember.Object.create({
        save() {
          return new Ember.RSVP.Promise(function(resolve, reject) {
            reject({ error: 'Password dont match' });
          });
        }
      }),
      transitionToRoute(route) {
        assert.equal(route, 'user');
      }
  });

  assert.throws(controller.send('createUser'), "throws with just a message, not using the 'expected' argument");

});
