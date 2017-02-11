import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('appointment', 'Unit | Model | appointment', {
  // Specify the other units that are required for this test.
  needs: ['model:service', 'model:employee']
});

test('checking default values for variables', function(assert) {
  assert.expect(4);
  const ctrl = this.subject();

  assert.equal(ctrl.get('color'), '#AB00FF', 'color default value properly set');
  assert.equal(ctrl.get('textColor'), '#FFFFFF', 'textColor default value properly set');
  assert.equal(ctrl.get('title'), 'New Appointment', 'title default value properly set');
  assert.equal(ctrl.get('status'), 'pending', 'pending default value properly set');
});

test('checking formattedStart', function(assert) {
  assert.expect(4);
  const ctrl = this.subject({start: "11/11/2016"});

  var re = /(\d){4}-(\d){2}-(\d){2}T(\d){2}:(\d){2}/g;
  assert.ok(re.test(ctrl.get('formattedStart')));

  //testing the set method
  Ember.run(function(){ //needed when method is asynchronous
  	assert.equal( ctrl.set('formattedStart', "1/2/2017"), "1/2/2017", 'value properly returned upon set');
  	assert.equal( ctrl.get('weekNumber'), 1, 'weekNumber properly set');
  	var re = /(\d){4}-(\d){2}-(\d){2}T(\d){2}:(\d){2}/g;
  	assert.ok(re.test(ctrl.get('start')));
  }); 
});

test('checking formattedEnd', function(assert) {
  assert.expect(3);
  const ctrl = this.subject({end: "11/11/2016"});

  var re = /(\d){4}-(\d){2}-(\d){2}T(\d){2}:(\d){2}/g;
  assert.ok(re.test(ctrl.get('formattedEnd')));

   //testing the set method
  Ember.run(function(){
  	assert.equal( ctrl.set('formattedEnd', "1/2/2017"), "1/2/2017", 'value properly returned upon set');
  	var re = /(\d){4}-(\d){2}-(\d){2}T(\d){2}:(\d){2}/g;
  	assert.ok(re.test(ctrl.get('end')));
  });
});


test('should belong to an employee', function(assert) {
  const Appointment = this.store().modelFor('appointment');
  const relationship = Ember.get(Appointment, 'relationshipsByName').get('employee');

  assert.equal(relationship.key, 'employee', 'has relationship with employee');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});

test('should belong to a service', function(assert) {
  const Appointment = this.store().modelFor('appointment');
  const relationship = Ember.get(Appointment, 'relationshipsByName').get('service');

  assert.equal(relationship.key, 'service', 'has relationship with service');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
});
