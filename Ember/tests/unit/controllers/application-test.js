import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:application', 'Unit | Controller | application', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('#handleNewAppointment redirects to my-calendar.appointments.new page', function(assert) {

  let ctrl = this.subject({
      transitionToRoute(route) {
        assert.equal(route, 'my-calendar.appointments.new');
      }
  });

  ctrl.send('handleAddNewAppointment');

  assert.ok(ctrl);
});