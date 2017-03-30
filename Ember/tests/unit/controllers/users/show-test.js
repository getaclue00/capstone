import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

const flashMessagesStub = Ember.Service.extend({
  danger(message) {
    this.set('calledWithMessage', message);
  }
});

moduleFor('controller:users/show', 'Unit | Controller | users/show', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checking confirm password', function(assert) {
  assert.expect(1);
  const ctrl = this.subject();

  assert.equal(ctrl.get('confirm'),
    undefined,
   'confirm properly set');
});

test('#updateUser transitions to employees', function(assert) {
  var done = assert.async();
  let userStub = Ember.Object.create({
    save() {
      return RSVP.resolve();
    }
  });
  let ctrl = this.subject({
      model: userStub,
      transitionToRoute(route) {
        assert.equal(route, 'employees');
        done();
      }
  });

  ctrl.send('updateUser');

  assert.ok(ctrl);
});

test('#updateUser throws an error following a failed creation (passwords match)', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  let done = assert.async();

  let userStub = Ember.Object.create({
    password: 'password',
    errors: {content: [{"attribute": "email","message":"is invalid"}]},
    save() {
      return RSVP.reject();
    }
  });

  let ctrl = this.subject({
      model: userStub,
      confirm: 'password'
  });

  ctrl.send('updateUser');
  setTimeout(function() {
    assert.ok(ctrl);
    assert.deepEqual(ctrl.get('flashMessages.calledWithMessage'), 'Error: email is invalid! ', 'danger flashMessages fired');
    done();
  }, 500);
});

test('#updateUser throws an error following a failed creation (passwords do not match)', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  let userStub = Ember.Object.create({
    password: 'password',
    save() {
      return RSVP.reject();
    }
  });

  let ctrl = this.subject({
      model: userStub,
      confirm: 'password1'
  });

  ctrl.send('updateUser');
  assert.ok(ctrl);
  assert.deepEqual(ctrl.get('flashMessages.calledWithMessage'), 'Error: passwords do not match!', 'danger flashMessages fired');
});
