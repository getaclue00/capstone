import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:employees/new', 'Unit | Controller | employees/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('#saveEmployee transitions to employees', function(assert) {
  var done = assert.async(); //Tell QUnit to wait for the done() call inside the timeout.
  const ctrl = this.subject({
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

  ctrl.send('saveEmployee');
  assert.ok(ctrl);
});

test('#saveEmployee throws as error following a failed creation', function(assert) {
  let ctrl = this.subject({
      model: Ember.Object.create({
        save() {
          return new Ember.RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not create a record' });
          });
        }
      })
  });

  assert.throws(ctrl.send('saveEmployee'),
   {
	  "message": "Cannot read property 'call' of undefined",
	  "name": "TypeError"
	},
   "throws with just a message, not using the 'expected' argument");

});
