import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const appointmentStub = Ember.Object.extend({
  getColor() {
    return this.get('color');
  },

  getTextColor() {
    return this.get('textColor');
  },

  getTitle() {
    return this.get('title');
  },

  getStart() {
    return this.get('start');
  },

  getEnd() {
    return this.get('end');
  },

  getNotes() {
    return this.get('notes');
  }
});

moduleForComponent('appointment-editor', 'Integration | Component | appointment editor', {
  integration: true
});

test('it renders default view', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  assert.expect(4);

  this.render(hbs`{{appointment-editor}}`);

  assert.equal(this.$('input[type="text"]').length, 1, 'should be only 1 input text field - Title');
  assert.equal(this.$('input[type="color"]').length, 2, 'should be only 2 input color fields - background color and text color');
  assert.equal(this.$('input[type="datetime-local"]').length, 2, 'should be only 2 input datetime-local filed for start and end times');
  assert.equal(this.$('textarea').length, 1, 'should be only 1 text area for the notes');
});

test('it renders a view with a model', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  let appointment = appointmentStub.create({
    color: '#AB00FF',
    textColor: '#FFFFFF',
    title: 'New Appointment Test',
    start: '2016-10-23T09:10',
    end: '2016-11-23T09:10',
    notes: 'some notes'
  });

  this.set('model', appointment);

  assert.expect(6);

  this.render(hbs`{{
    appointment-editor
    model=model
  }}`);

  assert.equal(this.$('input[type="text"]').val(), this.get('model.title'), 'titles should match');
  assert.equal(this.$('input[type="color"]')[0].value.toUpperCase(), this.get('model.color'), 'background colors should watch');
  assert.equal(this.$('input[type="color"]')[1].value.toUpperCase(), this.get('model.textColor'), 'text colors should watch');
  assert.equal(this.$('input[type="datetime-local"]')[0].value, this.get('model.start'), 'start times should match');
  assert.equal(this.$('input[type="datetime-local"]')[1].value, this.get('model.end'), 'end times should match');
  assert.equal(this.$('textarea').val(), this.get('model.notes'), 'the textarea should be filled in with the model notes');
});
