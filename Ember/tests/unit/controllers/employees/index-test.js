import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:employees/index', 'Unit | Controller | employees/index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checking arrays and hash maps', function(assert) {
  assert.expect(4);
  const ctrl = this.subject();

  assert.deepEqual(ctrl.get('headers'), 
  	["Name", "Employee ID", "Phone",
            "Start Date", "End Date"],
  	'header properly set');

  assert.deepEqual(ctrl.get('attributes'), 
  	{"fullName": "Name", "id" : "Employee ID:", "phoneNumber" : "Phone",
                "startDate": "Start Date", "endDate": "End Date"},
    'attributes properly set');

  assert.deepEqual(ctrl.get('operations'), 
  	{'employees.show': 'glyphicon-pencil', 'employees.delete': 'glyphicon-remove'},
   'operations properly set');

  assert.equal(ctrl.get('collection'), 
  	'employees',
   'operations properly set');
});