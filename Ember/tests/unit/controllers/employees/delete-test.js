import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:employees/delete', 'Unit | Controller | employees/delete', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checking type', function(assert) {
  assert.expect(1);
  const ctrl = this.subject();

  // check the type
  assert.equal(ctrl.get('type'), 'employee', 'type properly set');
});



test('#deleteEmployee deletes the employee', function(assert) {
  const ctrl = this.subject({
      model: Ember.Object.create({
        destroyRecord() {
          return new Ember.RSVP.Promise(function(resolve) {
            resolve(true);
          });
        }
      }),
      transitionToRoute(route) {
     
      	assert.equal(route, 'employees');
      }
  });

  ctrl.send('deleteEmployee');

  assert.ok(ctrl); //passes if first argument is T
});



test('#deleteEmployee remains on employee page following a failed deletion', function(assert) {
  let ctrl = this.subject({
      model: Ember.Object.create({
        destroyRecord() {
          return new Ember.RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not destroy a record' });
          });
        }
      })
  });
  assert.throws(ctrl.send('deleteEmployee'),  		
	{
	  "message": "Cannot read property 'call' of undefined",
	  "name": "TypeError"
	},
    "throws with just a message, not using the 'expected' argument");
});
