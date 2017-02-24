import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

const flashMessagesStub = Ember.Service.extend({
  danger(message) {
    this.set('calledWithMessage', message);
  }
});

moduleFor('controller:employees/delete', 'Unit | Controller | employees/delete', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checking type', function(assert) {
  assert.expect(1);
  const ctrl = this.subject();

  assert.equal(ctrl.get('type'), 'employee', 'type properly set');
});



test('#deleteEmployee deletes and redirects to employees page', function(assert) {
  var done = assert.async(); //Tell QUnit to wait for the done() call inside the timeout.
  const employeeStub = Ember.Object.create({
    destroyRecord() {
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

  ctrl.send('deleteEmployee');
  assert.ok(ctrl); //passes if first argument is T
});



test('#deleteEmployee throws an error following a failed deletion', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  let done = assert.async();
  const employeeStub = Ember.Object.create({
    destroyRecord() {
      return RSVP.reject();
    }
  });
  const ctrl = this.subject({
      model: employeeStub
  });

  ctrl.send('deleteEmployee');
  setTimeout(function() {
    assert.ok(ctrl);
    assert.deepEqual(ctrl.get('flashMessages.calledWithMessage'), 'Employee was not successfully deleted', 'danger flashMessages fired');
    done();
  }, 500);
});
