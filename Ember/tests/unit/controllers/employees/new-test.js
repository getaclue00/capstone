import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:employees/new', 'Unit | Controller | employees/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('#saveEmployee transitions to employees', function(assert) {
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

  controller.send('saveEmployee');

  assert.ok(controller);
});

test('#saveEmployee will NOT transition to employees', function(assert) {
  let controller = this.subject({
      model: Ember.Object.create({
        save() {
          return new Ember.RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not destroy a record' });
          });
        }
      }),
      transitionToRoute(route) {
        assert.equal(route, 'employees');
      }
  });

  assert.throws(controller.send('saveEmployee'), "throws with just a message, not using the 'expected' argument");

});
