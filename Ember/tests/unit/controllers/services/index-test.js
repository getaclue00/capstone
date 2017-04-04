import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:services/index', 'Unit | Controller | services/index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checking arrays and hash maps', function(assert) {
  assert.expect(3);
  const ctrl = this.subject({
    currentUser: {
      user: {
        admin: true
      }
    }
  });

  assert.deepEqual(ctrl.get('headers'),
	[
	  "Name of Service",
	  "Duration (minutes)",
	  "Price",
	  "Active",
	  "Displayable"
	],
  	'header properly set');

  assert.deepEqual(ctrl.get('attributes'),
	{
	  "duration": "Duration (minutes):",
	  "formattedActive": "Active",
	  "formattedDisplayable": "Displayable",
	  "name": "Name of Service",
	  "price": "Price ($)"
	},
    'attributes properly set');

  assert.deepEqual(ctrl.get('operations'),
	{
	  "services.delete": "glyphicon-remove",
	  "services.show": "glyphicon-pencil"
	},
   'operations properly set');
});
