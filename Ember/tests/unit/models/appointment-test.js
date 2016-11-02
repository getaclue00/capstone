import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('appointment', 'Unit | Model | appointment', {
  // Specify the other units that are required for this test.
  needs: ['model:employee']
});

test('should belong to an employee', function(assert) {
  const Appointment = this.store().modelFor('appointment');
  const relationship = Ember.get(Appointment, 'relationshipsByName').get('employee');

  assert.equal(relationship.key, 'employee', 'has relationship with employee');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});
