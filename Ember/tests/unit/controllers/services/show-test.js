import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:services/show', 'Unit | Controller | services/show', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('#deleteService transitions to services', function(assert) {
  let controller = this.subject({
      model: Ember.Object.create({
        destroyRecord() {
          return new Ember.RSVP.Promise(function(resolve) {
            resolve(true);
          });
        }
      }),
      transitionToRoute(route) {
        assert.equal(route, 'services');
      }
  });

  controller.send('deleteService');

  assert.ok(controller);
});

test('#deleteService will NOT transition to services', function(assert) {
  let controller = this.subject({
      model: Ember.Object.create({
        destroyRecord() {
          return new Ember.RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not destroy a record' });
          });
        }
      }),
      transitionToRoute(route) {
        assert.equal(route, 'services');
      }
  });

  assert.throws(controller.send('deleteService'), "throws with just a message, not using the 'expected' argument");

});

test('#saveService transitions to services', function(assert) {
  let controller = this.subject({
      model: Ember.Object.create({
        save() {
          return new Ember.RSVP.Promise(function(resolve) {
            resolve(true);
          });
        }
      }),
      transitionToRoute(route) {
        assert.equal(route, 'services');
      }
  });

  controller.send('updateService');

  assert.ok(controller);
});

test('#saveService will NOT transition to service', function(assert) {
  let controller = this.subject({
      model: Ember.Object.create({
        save() {
          return new Ember.RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not destroy a record' });
          });
        }
      }),
      transitionToRoute(route) {
        assert.equal(route, 'service');
      }
  });

  assert.throws(controller.send('updateService'), "throws with just a message, not using the 'expected' argument");

});
