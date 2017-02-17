import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';


moduleFor('controller:my-calendar', 'Unit | Controller | my calendar', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('checking defined variables', function(assert) {
  assert.expect(4);
  const ctrl = this.subject();

  assert.equal(ctrl.get('viewName'), 'month', 'variable properly set');

  assert.equal(ctrl.get('viewName2'), 'listWeek', 'variable properly set');

  assert.deepEqual(ctrl.get('businessHours'),
  	{
    dow: [ 1, 2, 3, 4, 5 ],
    start: '10:00',
    end: '18:00',
  	},
  'variable properly set');

  assert.deepEqual(ctrl.get('calendarHeader'),
  	{
    left:   'today',
    center: 'title',
    right:  'prev,next'
  	},
  'variable properly set');
});


test('checking computedTotal', function(assert) {
  assert.expect(1);
  const ctrl = this.subject();

  const modelArray = [Ember.Object.create({ cost: 2 }) ,Ember.Object.create({ cost: 1 })];

  ctrl.set('model', modelArray);
  assert.equal(ctrl.get('computedTotal'), '$3', 'total is calculated correctly');
});

test('checking computedEvents', function(assert) {
  assert.expect(1);
  const ctrl = this.subject();

  const modelArray = [Ember.Object.create({ id:1, formattedStart: "11/11/2016", formattedEnd: "12/12/2016", color: "#ff8000", textColor: "#ff8000"}) ,Ember.Object.create({ id:2, formattedStart: "10/10/2016", formattedEnd: "11/11/2016", color: "#fa6400", textColor: "#fd5300"})];
  ctrl.set('model',modelArray);
  assert.deepEqual(ctrl.get('computedEvents'),
	[
	  {
	    "color": "#ff8000",
	    "end": "12/12/2016",
	    "id": 1,
	    "start": "11/11/2016",
	    "textColor": "#ff8000",
	    "title": "Service"
	  },
	  {
	    "color": "#fa6400",
	    "end": "11/11/2016",
	    "id": 2,
	    "start": "10/10/2016",
	    "textColor": "#fd5300",
	    "title": "Service"
	  }
	],
  	'events calculated correctly');
});

test('#handleCalendarEventClick redirects to my-calendar.appointments.show page', function(assert) {

  let ctrl = this.subject({
      transitionToRoute(route) {
        assert.equal(route, 'my-calendar.appointments.show');
      }
  });
  ctrl.send('handleCalendarEventClick', 2); //eg. calendar event id is 2
  assert.ok(ctrl);
});
