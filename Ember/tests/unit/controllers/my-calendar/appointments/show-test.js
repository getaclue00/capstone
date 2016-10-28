import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:my-calendar/appointments/show', 'Unit | Controller | my calendar/appointments/show', {
});

test('#deleteAppointment transitionsTo my-calendar', function(assert) {
  // let controller = this.subject();
  let controller = this.subject({
      model: Ember.Object.create({
        destroyRecord() {
          return new Ember.RSVP.Promise(function(resolve) {
            resolve(true);
          });
        }
      }),
      transitionToRoute(route) {
        assert.equal(route, 'my-calendar');
      }
  });

  controller.send('deleteAppointment');

  assert.ok(controller);
});

test('#deleteAppointment will NOT transitionsTo my-calendar', function(assert) {
  // let controller = this.subject();
  let controller = this.subject({
      model: Ember.Object.create({
        destroyRecord() {
          return new Ember.RSVP.Promise(function(resolve, reject) {
            reject({ error: 'could not destroy a record' });
          });
        }
      }),
      transitionToRoute(route) {
        assert.equal(route, 'my-calendar');
      }
  });

  // controller.send('deleteAppointment');

  assert.throws(controller.send('deleteAppointment'), "throws with just a message, not using the 'expected' argument");

  // assert.ok(controller);
});
