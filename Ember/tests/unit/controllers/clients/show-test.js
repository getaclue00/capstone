import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

const flashMessagesStub = Ember.Service.extend({
  danger(message) {
    this.set('calledWithMessage', message);
  }
});

moduleFor('controller:clients/show', 'Unit | Controller | clients/show', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('#updateClient transitions to clients', function(assert) {
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

  ctrl.send('updateClient');

  assert.ok(ctrl);
});

test('#updateClient throws an error following a failed update', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  let done = assert.async();
  const clientStub = Ember.Object.create({
    errors: {content: [{"attribute": "email","message":"is invalid"}]},
    save() {
      return RSVP.reject();
    }
  });

  let ctrl = this.subject({
    model: clientStub
  });

  ctrl.send('updateClient');
  setTimeout(function() {
    assert.ok(ctrl);
    assert.deepEqual(ctrl.get('flashMessages.calledWithMessage'), 'Error: email is invalid! ', 'danger flashMessages fired');
    done();
  }, 500);
});
