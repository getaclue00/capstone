import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('service', 'Unit | Model | service', {
  // Specify the other units that are required for this test.
  needs: ['model:appointment']
});

test('checking default values for variables', function(assert) {
  assert.expect(5);
  const model = this.subject();

  assert.deepEqual(model.get('duration'), '60.00', 'duration default value properly set');
  assert.deepEqual(model.get('price'), "100.00", 'price default value properly set');
  assert.deepEqual(model.get('description'), '...', 'description default value properly set');
  assert.deepEqual(model.get('active'), false, 'active default value properly set');
  assert.deepEqual(model.get('displayable'), false, 'displayable default value properly set');
});

test('should own appointments', function(assert) {
  const Service = this.store().modelFor('service');
  const relationship = Ember.get(Service, 'relationshipsByName').get('appointments');

  assert.deepEqual(relationship.key, 'appointments', 'has relationship with appointments');
  assert.deepEqual(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
});
