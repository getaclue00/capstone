import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

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
  let controller = this.subject({
      model: userStub,
      transitionToRoute(route) {
        assert.equal(route, 'employees');
        done();
      }
  });
  controller.send('deleteUser');

  assert.ok(controller);
});

test('#deleteUser throws an error following a failed deletion', function(assert) {
  let userStub = Ember.Object.create({
    destroyRecord() {
      let errorMsg = { error: 'could not destroy a record' };
      return RSVP.reject(errorMsg);
    }
  });
  let controller = this.subject({
      model: userStub
  });
  assert.throws(controller.send('deleteUser'), "throws with just a message, not using the 'expected' argument");

});
