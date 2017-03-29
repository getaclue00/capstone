import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

const flashMessagesStub = Ember.Service.extend({
  danger(message) {
    this.set('calledWithMessage', message);
  }
});

moduleFor('controller:services/new', 'Unit | Controller | services/new', {
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

  ctrl.send('saveService');
  assert.ok(ctrl);
});

test('#saveService throws an error following a failed creation', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  let done = assert.async();
  const serviceStub = Ember.Object.create({
    errors: {content: [{"attribute": "name","message":"field missing"}]},
    save() {
      return RSVP.reject();
    }
  });
  let ctrl = this.subject({
      model: serviceStub
  });

  ctrl.send('saveService');
  setTimeout(function() {
    assert.ok(ctrl);
    assert.deepEqual(ctrl.get('flashMessages.calledWithMessage'), 'Error: name field missing! ', 'danger flashMessages fired');
    done();
  }, 500);

});
