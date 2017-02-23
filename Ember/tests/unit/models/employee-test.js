import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('employee', 'Unit | Model | employee', {
  // Specify the other units that are required for this test.
  needs: ['model:appointment', 'model:user']
});

test('checking fullName', function(assert) {
  assert.expect(1);
  const model = this.subject({firstName: 'Bruce', lastName: 'Wayne'});
  assert.deepEqual(model.get('fullName'), 'Bruce Wayne', 'fullName properly computed');
});

test('checking address', function(assert) {
  assert.expect(1);
  const model = this.subject({streetNumber: '23', streetName: 'Bank Street', city: 'Ottawa' , postalCode: "R3T 5E5"});
  assert.deepEqual(model.get('address'), '23-Bank Street, Ottawa, undefined, R3T 5E5', 'address properly computed');
});

test('checking formattedStartDate', function(assert) {
  assert.expect(1);
  const model = this.subject({startDate: "11/11/2016"});
  assert.deepEqual(model.get('formattedStartDate'), '2016-11-11T00:00', 'value properly returned upon set');
});

test('should own appointments', function(assert) {
  const Employee = this.store().modelFor('employee');
  const relationship = Ember.get(Employee, 'relationshipsByName').get('appointments');

  assert.deepEqual(relationship.key, 'appointments', 'has relationship with appointments');
  assert.deepEqual(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
});

test('should belong to a user', function(assert){
	const Employee = this.store().modelFor('employee');
	const relationship = Ember.get(Employee, 'relationshipsByName').get('user');

	assert.deepEqual(relationship.key, 'user', 'has relationship with user');
	assert.deepEqual(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});
