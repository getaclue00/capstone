import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('service', 'Unit | Model | service', {
  // Specify the other units that are required for this test.
  needs: ['model:appointment']
});

test('checking default values for variables', function(assert) {
  assert.expect(5);
  const ctrl = this.subject();

  assert.deepEqual(ctrl.get('duration'), "60.00", 'duration default value properly set');
  assert.deepEqual(ctrl.get('price'), "100.00", 'price_small default value properly set');
  assert.deepEqual(ctrl.get('description'), '...', 'description default value properly set');
  assert.deepEqual(ctrl.get('active'), false, 'active default value properly set');
  assert.deepEqual(ctrl.get('displayable'), false, 'displayable default value properly set');
});

test('checking formattedActive', function(assert) {
  assert.expect(1);
  const ctrl = this.subject({active: true});
  assert.deepEqual(ctrl.get('formattedActive'), "Yes", 'formattedActive works properly');
});

test('checking formattedDisplayable', function(assert) {
  assert.expect(1);
  const ctrl = this.subject({displayable: false});
  assert.deepEqual(ctrl.get('formattedDisplayable'), "No", 'formattedDisplayable works properly');
});

test('should own appointments', function(assert) {
  const Service = this.store().modelFor('service');
  const relationship = Ember.get(Service, 'relationshipsByName').get('appointments');

  assert.deepEqual(relationship.key, 'appointments', 'has relationship with appointments');
  assert.deepEqual(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
});
