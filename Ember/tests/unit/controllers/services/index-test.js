import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:services/index', 'Unit | Controller | services/index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checking arrays and hash maps', function(assert) {
  assert.expect(3);
  const ctrl = this.subject();

  assert.deepEqual(ctrl.get('headers'), 
  	["Name of Service", "Duration (minutes)", "Price for Small Vehicle ($)", "Price for Large Vehicle ($)",
            "Active", "Displayable"],
  	'header properly set');

  assert.deepEqual(ctrl.get('attributes'), 
  	{"name": "Name of Service", "duration" : "Duration (minutes):", "price_small" : "Price for Small Vehicle ($)",
               "price_large": "Price for Large Vehicle ($)", "active": "Active", "displayable": "Displayable"},
    'attributes properly set');

  assert.deepEqual(ctrl.get('operations'), 
  	{'services.show': 'glyphicon-pencil', 'services.delete': 'glyphicon-minus'},
   'operations properly set');
});
