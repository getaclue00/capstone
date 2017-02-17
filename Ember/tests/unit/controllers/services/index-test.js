import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:services/index', 'Unit | Controller | services/index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checking arrays and hash maps', function(assert) {
  assert.expect(3);
  const ctrl = this.subject();

  const headers = ["Name of Service", "Duration (minutes)", "Price for Small Vehicle ($)", "Price for Large Vehicle ($)",
            "Active", "Displayable"];
  assert.deepEqual(ctrl.get('headers'), headers,'header properly set');

  const attributes = {"name": "Name of Service", "duration" : "Duration (minutes):", "price_small" : "Price for Small Vehicle ($)",
               "price_large": "Price for Large Vehicle ($)", "active": "Active", "displayable": "Displayable"};
  assert.deepEqual(ctrl.get('attributes'), attributes,'attributes properly set');

  const operations = {'services.show': 'glyphicon-pencil', 'services.delete': 'glyphicon-minus'};
  assert.deepEqual(ctrl.get('operations'), operations,'operations properly set');
});
