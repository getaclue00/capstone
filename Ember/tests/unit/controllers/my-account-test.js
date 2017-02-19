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
  beforeEach() {
    this.register('service:flash-messages', flashMessagesStub);
    this.inject.service('flash-messages', { as: 'flashMessages' });
  }
});


test('#updateAccountInfo does NOT transition away from my-account ', function(assert) {
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

test('#updateAccountInfo throws an error following a failed update', function(assert) {
  var done = assert.async();

  let userStub = Ember.Object.create({
    get(property) {
      assert.deepEqual(property, 'employee', 'expected to be calling for an employee');

      let mockEmployee = Ember.Object.create({
        save() {
          let errorMsg = { error: 'could not update a record' };
          return RSVP.reject(errorMsg);
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
    assert.deepEqual(controller.get('flashMessages.calledWithMessage'), 'Account information was not saved', 'danger flashMessages fired');
    done();
  }, 500);
});

test('#updateLoginInfo does NOT transition away from my-account (passwords match)', function(assert) {
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
  let done = assert.async();

  let userStub = Ember.Object.create({
    confirm: 'password',
    password: 'pass1word',

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
    assert.deepEqual(controller.get('flashMessages.calledWithMessage'), 'Passwords do not match!', 'danger flashMessages fired');
    done();
  }, 500);
});

test('#updateLoginInfo throws an error following a failed update', function(assert) {
  let done = assert.async();

  let userStub = Ember.Object.create({
    confirm: 'password',
    password: 'password',

    save() {
      let errorMsg = { error: 'could not update a record' };
      return RSVP.reject(errorMsg);
    }
  });

  let controller = this.subject({
    model: userStub
  });

  controller.send('updateLoginInfo');

  setTimeout(function() {
    assert.ok(controller);
    assert.throws(controller.send('updateLoginInfo'), "throws with just a message, not using the 'expected' argument");
    done();
  }, 500);
});
