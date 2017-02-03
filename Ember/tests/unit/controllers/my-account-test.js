import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:my-account', 'Unit | Controller | my account', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:flash-messages'],
  beforeEach() {
    //We have to register any types we expect to use in this component
    const typesUsed = ['danger', 'success'];
    Ember.getOwner(this).lookup('service:flash-messages').registerTypes(typesUsed);
  }
});


test('#saveAccountInfo does NOT transition away from my-account ', function(assert) {
  let controller = this.subject({
      model: Ember.Object.create({
        get() {
          return new Ember.RSVP.Promise(function(resolve) {
          	resolve (
          		Ember.Object.create({
          			save() {
          				return new Ember.RSVP.Promise(function(resolve) {
            				resolve(true);
          				});
        			}
          		})
          	);
          });
        }
      }),
      transitionToRoute(route) {
        assert.equal(route, 'my-account');
      }
  });

  controller.send('updateAccountInfo');

  assert.ok(controller);
});


test('#saveLoginInfo does NOT transition away from my-account ', function(assert) {
  let controller = this.subject({
      model: Ember.Object.create({
        save() {
          return new Ember.RSVP.Promise(function(resolve) {
            resolve(true);
          });
        }
      }),
      transitionToRoute(route) {
        assert.equal(route, 'my-account');
      }
  });
  controller.send('updateLoginInfo');

  assert.ok(controller);
});
