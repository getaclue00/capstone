import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:appointment-history', 'Unit | Controller | appointment history', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});


test('checking arrays and hash maps', function(assert) {
  assert.expect(2);
  const ctrl = this.subject();

  assert.deepEqual(ctrl.get('headers'),
    ["Employee", "Client",
            "Start Time", "End Time", "Cost", "Location", "Status", "Notes"],
    'header properly set');

  assert.deepEqual(ctrl.get('attributes'),
    {"employee.last_name" : "Employee", "client.last_name" : "Client",
                "start": "Start Time", "end": "End Time", "cost": "Cost", "location": "Location",
                "status": "Status", "notes": "Notes"},
    'attributes properly set');
});
