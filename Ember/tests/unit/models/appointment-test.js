import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('appointment', 'Unit | Model | appointment', {
  // Specify the other units that are required for this test.
  needs: ['model:service']
});

test('should belong to a service', function(assert) {
  const Appointment = this.store().modelFor('appointment');
  const relationship = Ember.get(Appointment, 'relationshipsByName').get('service');

  assert.equal(relationship.key, 'service', 'has relationship with service');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});
