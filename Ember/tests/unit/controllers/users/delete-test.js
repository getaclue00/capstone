// import { moduleFor, test } from 'ember-qunit';
// import Ember from 'ember';

// moduleFor('controller:users/delete', 'Unit | Controller | users/delete', {
//   // Specify the other units that are required for this test.
//   // needs: ['controller:foo']
// });


// test('#deleteUser remains on employees page following a deletion', function(assert) {
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
//   controller.send('deleteUser');

//   assert.ok(controller);
// });

// test('#deleteUser remains on user page following a failed deletion', function(assert) {
//   let controller = this.subject({
//       model: Ember.Object.create({
//         destroyRecord() {
//           return new Ember.RSVP.Promise(function(resolve, reject) {
//             reject({ error: 'could not destroy a record' });
//           });
//         }
//       }),
//       transitionToRoute(route) {
//         assert.equal(route, 'user');
//       }
//   });
//   assert.throws(controller.send('deleteUser'), "throws with just a message, not using the 'expected' argument");

// });