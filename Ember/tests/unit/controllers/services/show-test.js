import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

const flashMessagesStub = Ember.Service.extend({
  danger(message) {
    this.set('calledWithMessage', message);
  }
});

moduleFor('controller:services/show', 'Unit | Controller | services/show', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('#saveService transitions to services', function(assert) {
  var done = assert.async();
  const serviceStub = Ember.Object.create({
    save() {
      return RSVP.resolve();
    }
  });
  let ctrl = this.subject({
      model: serviceStub,
      transitionToRoute(route) {
        assert.equal(route, 'services');
        done();
      }
  });

  ctrl.send('updateService');
  assert.ok(ctrl);
});

test('#saveService throws an error following a failed update', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  let done = assert.async();
  const serviceStub = Ember.Object.create({
    save() {
      return RSVP.reject();
    }
  });
  let ctrl = this.subject({
      model: serviceStub
  });

  ctrl.send('updateService');
  setTimeout(function() {
    assert.ok(ctrl);
    assert.deepEqual(ctrl.get('flashMessages.calledWithMessage'), 'Error: service was not successfully updated', 'danger flashMessages fired');
    done();
  }, 500);

});
