import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('appointment', 'Unit | Model | appointment', {
  // Specify the other units that are required for this test.
  needs: ['model:service', 'model:employee']
});

test('checking default values for variables', function(assert) {
  assert.expect(4);
  const model = this.subject();

  assert.deepEqual(model.get('color'), '#AB00FF', 'color default value properly set');
  assert.deepEqual(model.get('textColor'), '#FFFFFF', 'textColor default value properly set');
  assert.deepEqual(model.get('title'), 'New Appointment', 'title default value properly set');
  assert.deepEqual(model.get('status'), 'pending', 'pending default value properly set');
});


test('checking formattedStart', function(assert) {
  assert.expect(4);
  const model = this.subject({start: "11/11/2016"});
  assert.deepEqual(model.get('formattedStart'), '2016-11-11T00:00', 'start should follow a format');

  //testing the set method
  Ember.run(function() {
    model.set('formattedStart', '1/2/2017');
  });

  assert.deepEqual(model.get('formattedStart'), '1/2/2017', 'value properly returned upon set');
  assert.deepEqual(model.get('start'), '2017-01-02T00:00', 'start attribute was set correctly');
  assert.deepEqual(model.get('weekNumber'), 1, 'weeknumber was set correctly');
});

test('checking formattedEnd', function(assert) {
  assert.expect(3);
  const model = this.subject({end: "11/11/2016"});
  assert.deepEqual(model.get('formattedEnd'), '2016-11-11T00:00', 'end should follow a format');

  Ember.run(function(){
  	model.set('formattedEnd', "1/2/2017");
  });

  assert.deepEqual(model.get('formattedEnd'), '1/2/2017', 'value properly returned upon set');
  assert.deepEqual(model.get('end'), '2017-01-02T00:00', 'end attribute was set correctly');
});


test('should belong to an employee', function(assert) {
  const Appointment = this.store().modelFor('appointment');
  const relationship = Ember.get(Appointment, 'relationshipsByName').get('employee');

  assert.deepEqual(relationship.key, 'employee', 'has relationship with employee');
  assert.deepEqual(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});

test('should belong to a service', function(assert) {
  const Appointment = this.store().modelFor('appointment');
  const relationship = Ember.get(Appointment, 'relationshipsByName').get('service');

  assert.deepEqual(relationship.key, 'service', 'has relationship with service');
  assert.deepEqual(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});
