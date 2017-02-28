import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

const flashMessagesStub = Ember.Service.extend({
  danger(message) {
    this.set('calledWithMessage', message);
  }
});

moduleFor('controller:clients/new', 'Unit | Controller | clients/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('#saveClient transitions to clients', function(assert) {
  let done = assert.async();
  const clientStub = Ember.Object.create({
    save() {
      return RSVP.resolve();
    }
  });

  let ctrl = this.subject({
    model: clientStub,
    transitionToRoute(route) {
      assert.equal(route, 'clients');
      done();
    }
  });

  ctrl.send('saveClient');
  assert.ok(ctrl);
});

test('#saveClient throws an error following a failed creation', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  let done=assert.async();
  const clientStub = Ember.Object.create({
    save() {
      return RSVP.reject();
    }
  });

  let ctrl = this.subject({
    model: clientStub
  });

  ctrl.send('saveClient');
  setTimeout(function() {
    assert.ok(ctrl);
    assert.deepEqual(ctrl.get('flashMessages.calledWithMessage'), 'Client was not successfully created', 'danger flashMessages fired');
    done();
  }, 500);

});
