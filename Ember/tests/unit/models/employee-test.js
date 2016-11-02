import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('employee', 'Unit | Model | employee', {
  // Specify the other units that are required for this test.
  needs: ['model:appointment']
});

test('should own appointments', function(assert) {
  const Employee = this.store().modelFor('employee');
  const relationship = Ember.get(Employee, 'relationshipsByName').get('appointments');
  // let store = this.store();
  assert.equal(relationship.key, 'appointments', 'has relationship with appointments');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
});
