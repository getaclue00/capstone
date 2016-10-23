import DS from 'ember-data';
const { attr, Model } = DS;

export default Model.extend({
  color:      attr('string', { defaultValue: '#AB00FF' }),
  textColor:  attr('string', { defaultValue: '#FFFFFF' }),
  title:      attr('string', { defaultValue: 'New Appointment' }),
  start:      attr('date', { defaultValue: '2016-10-23T09:10' }),
  end:        attr('date', { defaultValue: '2016-11-23T09:10' }),
  url:        attr('string', { defaultValue: '/url-not-set' }),
  notes:      attr('text')
});
