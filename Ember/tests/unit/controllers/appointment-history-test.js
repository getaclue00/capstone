import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:appointment-history', 'Unit | Controller | appointment history', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});


test('checking arrays and hash maps', function(assert) {
  assert.expect(4);
  const ctrl = this.subject();

  assert.deepEqual(ctrl.get('headers'),
    ["Service", "Employee", "Client",
            "Start Time", "End Time", "Cost", "Location", "Status", "Notes"],
    'header properly set');

  assert.deepEqual(ctrl.get('attributes'),
    {"service.name": "Service", "employee.last_name" : "Employee", "client.last_name" : "Client",
                "start": "Start Time", "end": "End Time", "cost": "Cost", "location": "Location",
                "status": "Status", "notes": "Notes"},
    'attributes properly set');

  assert.deepEqual(ctrl.get('operations'),
    {},
   'operations properly set');

  assert.equal(ctrl.get('collection'),
    'appointments',
   'operations properly set');
});
