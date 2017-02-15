import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('client', 'Unit | Model | client', {
  // Specify the other units that are required for this test.
  needs: ['model:appointment']
});

test('checking fullName', function(assert) {
  assert.expect(1);
  const ctrl = this.subject({firstName: 'Bruce', lastName: 'Wayne'});
  assert.equal(ctrl.get('fullName'), 'Bruce Wayne', 'fullName properly computed');
});

test('checking address', function(assert) {
  assert.expect(1);
  const ctrl = this.subject({streetNumber: '23', streetName: 'Bank Street', city: 'Ottawa' , postalCode: "R3T 5E5"});
  assert.equal(ctrl.get('address'), '23-Bank Street, Ottawa, undefined, R3T 5E5', 'address properly computed');
});

test('should own appointments', function(assert) {
  const Client = this.store().modelFor('client');
  const relationship = Ember.get(Client, 'relationshipsByName').get('appointments');
  // let store = this.store();
  assert.equal(relationship.key, 'appointments', 'has relationship with appointments');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
});
