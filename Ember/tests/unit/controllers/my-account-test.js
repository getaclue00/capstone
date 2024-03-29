import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

const flashMessagesStub = Ember.Service.extend({
  success(message) {
    this.set('calledWithMessage', message);
  },

  danger(message) {
    this.set('calledWithMessage', message);
  }
});

moduleFor('controller:my-account', 'Unit | Controller | my account', {
});


test('#updateAccountInfo does NOT transition away from my-account ', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  var done = assert.async();

  let userStub = Ember.Object.create({
    get(property) {
      assert.deepEqual(property, 'employee', 'expected to be calling for an employee');

      let mockEmployee = Ember.Object.create({
        save() {
          return RSVP.resolve();
        }
      });

      return RSVP.resolve(mockEmployee);
    }
  });

  let controller = this.subject({
    model: userStub
  });

  controller.send('updateAccountInfo');

  setTimeout(function() {
    assert.ok(controller);
    assert.deepEqual(controller.get('flashMessages.calledWithMessage'), 'Successfully saved!', 'success flashMessages fired');
    done();
  }, 500);

});

test('#updateAccountInfo throws an error msg following a failed update', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  var done = assert.async();

  let userStub = Ember.Object.create({
    get(property) {
      assert.deepEqual(property, 'employee', 'expected to be calling for an employee');

      let mockEmployee = Ember.Object.create({
        errors: {content: [{"attribute": "postalCode","message":"is invalid (please use A1F 3E2)"}]},
        save() {
          return RSVP.reject();
        }
      });

      return RSVP.resolve(mockEmployee);
    }
  });

  let controller = this.subject({
    model: userStub
  });

  controller.send('updateAccountInfo');

  setTimeout(function() {
    assert.deepEqual(controller.get('flashMessages.calledWithMessage'), 'Error: postalCode is invalid (please use A1F 3E2)! ', 'danger flashMessages fired');
    done();
  }, 500);
});

test('#updateLoginInfo does NOT transition away from my-account (passwords match)', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  let done = assert.async();

  let userStub = Ember.Object.create({
    confirm: 'password',
    password: 'password',

    save() {
      return RSVP.resolve();
    }
  });

  let controller = this.subject({
    model: userStub
  });

  controller.send('updateLoginInfo');

  setTimeout(function() {
    assert.ok(controller);
    assert.deepEqual(controller.get('flashMessages.calledWithMessage'), 'Password successfully changed!', 'success flashMessages fired');
    done();
  }, 500);
});

test('#updateLoginInfo does NOT transition away from my-account (passwords do not match)', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  let userStub = Ember.Object.create({
    confirm: 'password',
    password: 'pass1word',
  });

  let controller = this.subject({
    model: userStub
  });

  controller.send('updateLoginInfo');
  //setTimeout in not needed because the save is not trying to execute in the actual code
  assert.ok(controller);
  assert.deepEqual(controller.get('flashMessages.calledWithMessage'), 'Error: passwords do not match', 'danger flashMessages fired');
});

test('#updateLoginInfo throws an error following a failed update', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  let done = assert.async();

  let userStub = Ember.Object.create({
    confirm: 'password',
    password: 'password',
    errors: {content: [{"attribute": "password","message":"is too short (minimum is 6 characters)"}]},

    save() {
      return RSVP.reject();
    }
  });

  let controller = this.subject({
    model: userStub
  });

  controller.send('updateLoginInfo');
  setTimeout(function() {
    assert.ok(controller);
    assert.deepEqual(controller.get('flashMessages.calledWithMessage'), 'Error: password is too short (minimum is 6 characters)! ', 'danger flashMessages fired');
    done();
  }, 500);
});
