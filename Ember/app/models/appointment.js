import DS from 'ember-data';

const { attr, Model, belongsTo } = DS;

export default Model.extend({
  color:      attr('string', { defaultValue: '#AB00FF' }),
  textColor:  attr('string', { defaultValue: '#FFFFFF' }),
  title:      attr('string', { defaultValue: 'New Appointment' }),
  date:       attr('string'),
  start:      attr('isodate'),
  end:        attr('isodate'),
  notes:      attr('string', { defaultValue: '' }),
  status:     attr('string', { defaultValue: 'pending' }),
  weekNumber: attr('number'),
  service:    belongsTo('service'),
  employee:   belongsTo('employee')
});
