import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

moduleFor('controller:employees/show', 'Unit | Controller | employees/show', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('#updateEmployee transitions to employees', function(assert) {
  var done = assert.async(); //Tell QUnit to wait for the done() call inside the timeout.
  const employeeStub = Ember.Object.create({
    save() {
      return RSVP.resolve();
    }
  });
  const ctrl = this.subject({
      model: employeeStub,
      transitionToRoute(route) {
      	assert.equal(route, 'employees');
      	done();
      }
  });

  ctrl.send('updateEmployee');
  assert.ok(ctrl);
});

test('#updateEmployee throws as error following a failed update', function(assert) {
  const employeeStub = Ember.Object.create({
    save() {
      let errorMsg = { error: 'could not update a record' };
      return RSVP.reject(errorMsg);
    }
  });
  let ctrl = this.subject({
      model: employeeStub
  });

  assert.throws(ctrl.send('updateEmployee'),
   "throws with just a message, not using the 'expected' argument");
});
