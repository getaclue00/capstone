import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:users/show', 'Unit | Controller | users/show', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('#updateUser transitions to employees', function(assert) {
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

  controller.send('updateUser');

  assert.ok(controller);
});

test('#updateUser will NOT transition to employees', function(assert) {
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

  assert.throws(controller.send('updateUser'), "throws with just a message, not using the 'expected' argument");

});

