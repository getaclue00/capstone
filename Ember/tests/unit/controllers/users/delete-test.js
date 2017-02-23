import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

const flashMessagesStub = Ember.Service.extend({
  danger(message) {
    this.set('calledWithMessage', message);
  }
});

moduleFor('controller:users/delete', 'Unit | Controller | users/delete', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checking type', function(assert) {
  assert.expect(1);
  const ctrl = this.subject();

  assert.equal(ctrl.get('type'), 'user', 'type properly set');
});


test('#deleteUser remains on employees page following a deletion', function(assert) {
  var done = assert.async();
  let userStub = Ember.Object.create({
    destroyRecord() {
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
  ctrl.send('deleteUser');

  assert.ok(ctrl);
});

test('#deleteUser throws an error following a failed deletion', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  let done = assert.async();
  let userStub = Ember.Object.create({
    destroyRecord() {
      return RSVP.reject();
    }
  });
  let ctrl = this.subject({
      model: userStub
  });

  ctrl.send('deleteUser');
  setTimeout(function() {
    assert.ok(ctrl);
    assert.deepEqual(ctrl.get('flashMessages.calledWithMessage'), 'Account was not successfully deleted', 'danger flashMessages fired');
    done();
  }, 500);

});
