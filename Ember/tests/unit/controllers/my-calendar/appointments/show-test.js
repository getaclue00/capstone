import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:my-calendar/appointments/show', 'Unit | Controller | my calendar/appointments/show', {
});

test('#deleteAppointment transitionsTo my-calendar', function(assert) {
  // let controller = this.subject();
  let controller = this.subject({
      appointment: Ember.Object.create({
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
      appointment: Ember.Object.create({
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

test('#saveAppointment transitionsTo my-calendar', function(assert) {
  // let controller = this.subject();
  let controller = this.subject({
      appointment: Ember.Object.create({
        save() {
          return new Ember.RSVP.Promise(function(resolve) {
            resolve(true);
          });
        }
      }),
      transitionToRoute(route) {
        assert.equal(route, 'my-calendar');
      }
  });

  controller.send('saveAppointment');

  assert.ok(controller);
});

test('#saveAppointment will NOT transitionsTo my-calendar', function(assert) {
  // let controller = this.subject();
  let controller = this.subject({
      appointment: Ember.Object.create({
        save() {
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

  assert.throws(controller.send('saveAppointment'), "throws with just a message, not using the 'expected' argument");

  // assert.ok(controller);
});

test('#assignedEmployee will assign an employee to an appointment', function(assert) {

  let employee = Ember.Object.create({
    lastName: 'batman'
  });

  let controller = this.subject({
    appointment: Ember.Object.create({
      employee: undefined
    }),

    assignedEmployee(employee){
      this.set('appointment.employee', employee);
    }
  });

  assert.notOk(controller.get('appointment.employee'), 'should be undefined at the beginning');

  controller.assignedEmployee(employee);

  assert.deepEqual(controller.get('appointment.employee.lastName'), employee.get('lastName'), 'should change the employee');

});
