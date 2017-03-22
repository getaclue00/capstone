import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('company-preference', 'Unit | Model | company preference', {
  // Specify the other units that are required for this test.
  needs: ['model:employee']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('should belong to a user and company-preference', function(assert){
  const CompanyPreference = this.store().modelFor('company-preference');
  const relationshipEmployee = Ember.get(CompanyPreference, 'relationshipsByName').get('employee');

  assert.deepEqual(relationshipEmployee.key, 'employee', 'has relationship with employee');
  assert.deepEqual(relationshipEmployee.kind, 'belongsTo', 'kind of relationship is belongsTo');
});
