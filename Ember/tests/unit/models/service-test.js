import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('service', 'Unit | Model | service', {
  // Specify the other units that are required for this test.
  needs: ['model:appointment']
});

test('should own appointments', function(assert) {
  const Service = this.store().modelFor('service');
  const relationship = Ember.get(Service, 'relationshipsByName').get('appointments');

  assert.equal(relationship.key, 'appointments', 'has relationship with appointments');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
});
