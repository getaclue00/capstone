import { moduleForModel, test } from 'ember-qunit';

moduleForModel('login-data', 'Unit | Model | login data', {
  // Specify the other units that are required for this test.
  needs: []
});

test('checking default values for variables', function(assert) {
  assert.expect(1);
  const model = this.subject();

  assert.deepEqual(model.get('remember_me'), false, 'remember_me default value properly set');
});
