import { moduleFor, test } from 'ember-qunit';
// import Ember from 'ember';

moduleFor('controller:employees/delete', 'Unit | Controller | employees/delete', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checking type', function(assert) {
  assert.expect(1);

  // get the controller instance
  const ctrl = this.subject();

  // check the type
  assert.equal(ctrl.get('type'), 'employee', 'type properly set');
});


// postCtrl.set('model', Ember.Object.create({ title: 'foo' }));

test('#deleteEmployee deletes the employee', function(assert) {
  const ctrl = this.subject({
      model: Ember.Object.create({
        destroyRecord() {
          return new Ember.RSVP.Promise(function(resolve) {
            resolve(true);
          });
        }
      }),
      transitionToRoute(route) {
        assert.equal(route, 'employees');
      }
  });
  ctrl.send('deleteEmployee');

  assert.ok(ctrl);
});

// test('#deleteEmployee remains on deletion page following a deletion', function(assert) {
//   let controller = this.subject({
//       model: Ember.Object.create({
//         destroyRecord() {
//           return new Ember.RSVP.Promise(function(resolve) {
//             resolve(true);
//           });
//         }
//       }),
//       transitionToRoute(route) {
//         assert.equal(route, 'employees');
//       }
//   });
//   controller.send('deleteEmployee');
//
//   assert.ok(controller);
// });
//
// test('#deleteEmployee remains on employee page following a failed deletion', function(assert) {
//   let controller = this.subject({
//       model: Ember.Object.create({
//         destroyRecord() {
//           return new Ember.RSVP.Promise(function(resolve, reject) {
//             reject({ error: 'could not destroy a record' });
//           });
//         }
//       }),
//       transitionToRoute(route) {
//         assert.equal(route, 'employee');
//       }
//   });
//   assert.throws(controller.send('deleteEmployee'), "throws with just a message, not using the 'expected' argument");
//
// });
