import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('employee', 'Unit | Model | employee', {
  // Specify the other units that are required for this test.
  needs: ['model:appointment', 'model:user']
});

test('should own appointments', function(assert) {
  const Employee = this.store().modelFor('employee');
  const relationship = Ember.get(Employee, 'relationshipsByName').get('appointments');
  // let store = this.store();
  assert.equal(relationship.key, 'appointments', 'has relationship with appointments');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
});

test('should belong to a user', function(assert){
	const Employee = this.store().modelFor('employee');
	const relationship = Ember.get(Employee, 'relationshipsByName').get('user');

	assert.equal(relationship.key, 'user', 'has relationship with user');
	assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});