import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('service', 'Unit | Model | service', {
  // Specify the other units that are required for this test.
  needs: ['model:appointment']
});

test('checking default values for variables', function(assert) {
  assert.expect(5);
  const ctrl = this.subject();

  assert.equal(ctrl.get('duration'), 60.0, 'duration default value properly set');
  assert.equal(ctrl.get('price'), 100.0, 'price default value properly set');
  assert.equal(ctrl.get('description'), '...', 'description default value properly set');
  assert.equal(ctrl.get('active'), false, 'active default value properly set');
  assert.equal(ctrl.get('displayable'), false, 'displayable default value properly set');
});

test('should own appointments', function(assert) {
  const Service = this.store().modelFor('service');
  const relationship = Ember.get(Service, 'relationshipsByName').get('appointments');

  assert.equal(relationship.key, 'appointments', 'has relationship with appointments');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
});
