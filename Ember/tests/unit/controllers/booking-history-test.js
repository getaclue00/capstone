import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:booking-history', 'Unit | Controller | booking history', {
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
    {"service.name": "Service", "employee.fullName" : "Employee", "client.fullName" : "Client",
                "formattedStart": "Start Time", "formattedEnd": "End Time", "cost": "Cost", "location": "Location",
                "status": "Status", "notes": "Notes"},
    'attributes properly set');

  assert.deepEqual(ctrl.get('operations'),
    {'appointment-history': 'glyphicon-book'},
   'operations properly set');

  assert.equal(ctrl.get('collection'),
    'appointments',
   'operations properly set');
});

