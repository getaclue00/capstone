import DS from 'ember-data';

const { attr, Model } = DS;

export default Model.extend({
  color:      attr('string', { defaultValue: '#AB00FF' }),
  textColor:  attr('string', { defaultValue: '#FFFFFF' }),
  title:      attr('string', { defaultValue: 'New Appointment' }),
  start:      attr('date', { defaultValue: new Date("2016-10-25T09:10") }),
  end:        attr('date', { defaultValue: new Date("2016-10-26T09:10") }),
  notes:      attr('string')
});
