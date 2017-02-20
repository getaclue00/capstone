import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:clients/index', 'Unit | Controller | clients/index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checking arrays and hash maps', function(assert) {
  assert.expect(4);
  const ctrl = this.subject();

  assert.deepEqual(ctrl.get('headers'),
  	["Name", "Client ID", "Email",
            "Phone"],
  	'header properly set');

  assert.deepEqual(ctrl.get('attributes'),
  	{"fullName": "Name", "id" : "Client ID:", "email": "Email",
     "phoneNumber" : "Phone"},
    'attributes properly set');

  assert.deepEqual(ctrl.get('operations'),
  	{'clients.show': 'glyphicon-pencil', 'clients.delete': 'glyphicon-remove'},
   'operations properly set');

  assert.equal(ctrl.get('collection'),
  	'clients',
   'operations properly set');
});
