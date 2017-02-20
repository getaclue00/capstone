import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

moduleFor('controller:employees/new', 'Unit | Controller | employees/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('#saveEmployee transitions to employees', function(assert) {
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

  ctrl.send('saveEmployee');
  assert.ok(ctrl);
});

test('#saveEmployee throws as error following a failed creation', function(assert) {
  const employeeStub = Ember.Object.create({
    save() {
      let errorMsg = { error: 'could not create a record' };
      return RSVP.reject(errorMsg);
    }
  });
  let ctrl = this.subject({
      model: employeeStub
  });

  assert.throws(ctrl.send('saveEmployee'),
   "throws with just a message, not using the 'expected' argument");
});
