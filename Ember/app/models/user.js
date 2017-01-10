import DS from 'ember-data';

const { attr, Model, belongsTo } = DS;

export default Model.extend({
  email: attr('string', { defaultValue: 'not setup' }),
  password: attr('string', { defaultValue: 'not setup' }),
  admin: attr('boolean', { defaultValue: false }),
  employee:   belongsTo('employee')
});
