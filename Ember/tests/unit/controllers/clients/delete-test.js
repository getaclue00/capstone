import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

const flashMessagesStub = Ember.Service.extend({
  danger(message) {
    this.set('calledWithMessage', message);
  }
});

moduleFor('controller:clients/delete', 'Unit | Controller | clients/delete', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checking type', function(assert) {
  assert.expect(1);
  const ctrl = this.subject();

  assert.equal(ctrl.get('type'), 'client', 'type properly set');
});

test('#deleteClient deletes and redirects to clients page', function(assert) {
  let done = assert.async();
  const clientStub = Ember.Object.create({
    destroyRecord() {
      return new RSVP.resolve(true);
    }
  });
  let ctrl = this.subject({
      model: clientStub,
      transitionToRoute(route) {
        assert.equal(route, 'clients');
        done();
      }
  });
  ctrl.send('deleteClient');
  assert.ok(ctrl);
});

test('#deleteService throws an error following a failed deletion', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  let done = assert.async();
  const userStub = Ember.Object.create({
    destroyRecord() {
      let rejectMsg = { error:'could not destroy a record' };
      return new RSVP.reject(rejectMsg);
    }
  });
  let ctrl = this.subject({
    model: userStub
  });

  ctrl.send('deleteClient');
  setTimeout(function() {
    assert.ok(ctrl);
    assert.deepEqual(ctrl.get('flashMessages.calledWithMessage'), 'Client was not successfully deleted', 'danger flashMessages fired');
    done();
  }, 500);
});
