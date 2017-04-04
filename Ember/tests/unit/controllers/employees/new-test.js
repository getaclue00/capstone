import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

const flashMessagesStub = Ember.Service.extend({
  danger(message) {
    this.set('calledWithMessage', message);
  }
});

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
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  let done = assert.async();
  const employeeStub = Ember.Object.create({
    errors: {content: [{"attribute": "postalCode","message":"is invalid (please use A1F 3E2)"}]},
    save() {
      return RSVP.reject();
    }
  });
  let ctrl = this.subject({
      model: employeeStub
  });

  ctrl.send('saveEmployee');
  setTimeout(function() {
    assert.ok(ctrl);
    assert.deepEqual(ctrl.get('flashMessages.calledWithMessage'), 'Error: postalCode is invalid (please use A1F 3E2)! ', 'danger flashMessages fired');
    done();
  }, 500);
});
