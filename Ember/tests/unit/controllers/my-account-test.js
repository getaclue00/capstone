import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const flashMessagesStub = Ember.Service.extend({
  success(message) {
    this.set('calledWithMessage', message);
  },

  danger(message) {
    this.set('calledWithMessage', message);
  }
});

moduleFor('controller:my-account', 'Unit | Controller | my account', {
  beforeEach() {
    this.register('service:flash-messages', flashMessagesStub);
    this.inject.service('flash-messages', { as: 'flashMessages' });
  }
});


test('#updateAccountInfo does NOT transition away from my-account ', function(assert) {
  var done = assert.async();

  let userStub = Ember.Object.create({
    get(property) {
      assert.equal(property, 'employee', 'expected to be calling for an employee');

      let mockEmployee = Ember.Object.create({
        save() {
          return new Ember.RSVP.resolve();
        }
      });

      return Ember.RSVP.resolve(mockEmployee);
    }
  });

  let controller = this.subject({
    model: userStub
  });

  controller.send('updateAccountInfo');

  setTimeout(function() {
    assert.ok(controller);
    assert.equal(controller.get('flashMessages.calledWithMessage'), 'Successfully saved!', 'success flashMessages fired');
    done();
  }, 500);

});

test('#updateAccountInfo throws an error following a failed update', function(assert) {
  var done = assert.async();

  let userStub = Ember.Object.create({
    get(property) {
      assert.equal(property, 'employee', 'expected to be calling for an employee');

      let mockEmployee = Ember.Object.create({
        save() {
          let errorMsg = { error: 'could not update a record' };
          return new Ember.RSVP.reject(errorMsg);
        }
      });

      return Ember.RSVP.resolve(mockEmployee);
    }
  });

  let controller = this.subject({
    model: userStub
  });

  // assert.throws(controller.send('updateAccountInfo'), "throws with just a message, not using the 'expected' argument");
  controller.send('updateAccountInfo');

  setTimeout(function() {
    assert.equal(controller.get('flashMessages.calledWithMessage'), 'Account information was not saved', 'danger flashMessages fired');
    done();
  }, 500);
});

//
//
// test('#saveLoginInfo does NOT transition away from my-account ', function(assert) {
//   let controller = this.subject({
//       model: Ember.Object.create({
//         save() {
//           return new Ember.RSVP.Promise(function(resolve) {
//             resolve(true);
//           });
//         }
//       })
//   });
//   controller.send('updateLoginInfo');
//
//   assert.ok(controller);
// });
//
// test('#saveLoginInfo throws an error following a failed update', function(assert) {
//   let controller = this.subject({
//       model: Ember.Object.create({
//         save() {
//           return new Ember.RSVP.Promise(function(resolve, reject) {
//             reject({ error: 'could not update a record' });
//           });
//         }
//       })
//   });
//   assert.throws(controller.send('updateLoginInfo'), "throws with just a message, not using the 'expected' argument");
// });
