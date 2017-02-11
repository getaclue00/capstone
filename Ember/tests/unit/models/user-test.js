import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('user', 'Unit | Model | user', {
  // Specify the other units that are required for this test.
  needs: ['model:employee']
});

test('checking default values for variables', function(assert) {
  assert.expect(2);
  const ctrl = this.subject();

  assert.equal(ctrl.get('email'), "not setup", 'email default value properly set');
  assert.equal(ctrl.get('admin'), false, 'admin default value properly set');
});

test('should belong to an employee', function (assert){
	const User = this.store().modelFor('user');
	const relationship = Ember.get(User, 'relationshipsByName').get('employee');

	assert.equal(relationship.key, 'employee', 'has relationship with employee');
	assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});



