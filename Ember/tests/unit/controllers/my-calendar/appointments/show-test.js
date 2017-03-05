import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';

const flashMessagesStub = Ember.Service.extend({
  danger(message) {
    this.set('calledWithMessage', message);
  }
});

moduleFor('controller:my-calendar/appointments/show', 'Unit | Controller | my calendar/appointments/show', {
});

test('#deleteAppointment transitionsTo my-calendar', function(assert) {
  var done = assert.async();
  const appointmentStub = Ember.Object.create({
    destroyRecord() {
      return RSVP.resolve();
    }
  });

  const modalId = `myModal`;

  let ctrl = this.subject({
      appointment: appointmentStub,
      stringThatIsUsedForModalIdInTemplate: modalId,
      transitionToRoute(route) {
        assert.equal(route, 'my-calendar');
        done();
      }
  });

  ctrl.send('deleteAppointment');

  assert.ok(ctrl);
  assert.deepEqual(ctrl.get('stringThatIsUsedForModalIdInTemplate'), modalId);
});

test('#deleteAppointment throws an error following a failed delete', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  let done = assert.async();
  const appointmentStub = Ember.Object.create({
    destroyRecord() {
      return RSVP.reject();
    }
  });

  const modalId = `myModal`;

  let ctrl = this.subject({
    stringThatIsUsedForModalIdInTemplate: modalId,
    appointment: appointmentStub
  });

  ctrl.send('deleteAppointment');
  setTimeout(function() {
    assert.ok(ctrl);
    assert.deepEqual(ctrl.get('flashMessages.calledWithMessage'), 'Appointment was not successfully deleted', 'danger flashMessages fired');
    assert.deepEqual(ctrl.get('stringThatIsUsedForModalIdInTemplate'), modalId);
    done();
  }, 500);
});

test('#saveAppointment transitionsTo my-calendar', function(assert) {

  var done = assert.async();

  const appointmentStub = Ember.Object.create({
    save() {
      return RSVP.resolve();
    }
  });

  const modalId = `myModal`;

  let ctrl = this.subject({
    stringThatIsUsedForModalIdInTemplate: modalId,
    appointment: appointmentStub,
    transitionToRoute(route) {
      assert.equal(route, 'my-calendar');
      done();
    }
  });

  ctrl.send('saveAppointment');

  assert.ok(ctrl);
  assert.deepEqual(ctrl.get('stringThatIsUsedForModalIdInTemplate'), modalId);
});

test('#saveAppointment throws an error following a failed update', function(assert) {
  this.register('service:flash-messages', flashMessagesStub);
  this.inject.service('flash-messages', { as: 'flashMessages' });

  let done = assert.async();
  const appointmentStub = Ember.Object.create({
    save() {
      return RSVP.reject();
    }
  });

  const modalId = `myModal`;

  let ctrl = this.subject({
    stringThatIsUsedForModalIdInTemplate: modalId,
    appointment: appointmentStub
  });

  ctrl.send('saveAppointment');
  setTimeout(function() {
    assert.ok(ctrl);
    assert.deepEqual(ctrl.get('flashMessages.calledWithMessage'), 'Appointment was not successfully updated', 'danger flashMessages fired');
    assert.deepEqual(ctrl.get('stringThatIsUsedForModalIdInTemplate'), modalId);
    done();
  }, 500);
});
