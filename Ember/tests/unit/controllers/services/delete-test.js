import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

const flashMessagesStub = Ember.Service.extend({
  danger(message) {
    this.set('calledWithMessage', message);
  }
});

moduleFor('controller:services/delete', 'Unit | Controller | services/delete', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checking type', function(assert) {
  assert.expect(1);
  const ctrl = this.subject();

  assert.equal(ctrl.get('type'), 'service', 'type properly set');
});

test('#deleteServices deletes and redirects to services page', function(assert) {
  var done = assert.async();
  const serviceStub = Ember.Object.create({
    destroyRecord() {
      return RSVP.resolve();
    }
  });
  let controller = this.subject({
      model: serviceStub,
      transitionToRoute(route) {
        assert.equal(route, 'services');
        done();
      }
  });
  controller.send('deleteService');

  assert.ok(controller);
});

test('#deleteService throws an error following a failed deletion', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  let done = assert.async();
  const serviceStub = Ember.Object.create({
    destroyRecord() {
      return RSVP.reject();
    }
  });
  let ctrl = this.subject({
      model: serviceStub
    });

  ctrl.send('deleteService');
  setTimeout(function() {
    assert.ok(ctrl);
    assert.deepEqual(ctrl.get('flashMessages.calledWithMessage'), 'Service was not successfully deleted', 'danger flashMessages fired');
    done();
  }, 500);
});
