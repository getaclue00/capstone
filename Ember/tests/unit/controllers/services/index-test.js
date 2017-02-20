import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:services/index', 'Unit | Controller | services/index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checking arrays and hash maps', function(assert) {
  assert.expect(3);
  const ctrl = this.subject();

  const headers = [
    "Name of Service",
    "Duration (minutes)",
    "Price",
    "Active",
    "Displayable"
  ];
  assert.deepEqual(ctrl.get('headers'), headers,'header properly set');

  const attributes = {
    "duration": "Duration (minutes):",
    "formattedActive": "Active",
    "formattedDisplayable": "Displayable",
    "name": "Name of Service",
    "price": "Price ($)"
  };
  assert.deepEqual(ctrl.get('attributes'), attributes,'attributes properly set');

  const operations = {
    "services.delete": "glyphicon-remove",
    "services.show": "glyphicon-pencil"
  };
  assert.deepEqual(ctrl.get('operations'), operations,'operations properly set');
});
