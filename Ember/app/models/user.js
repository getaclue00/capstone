import DS from 'ember-data';

const { attr, Model, belongsTo } = DS;

export default DS.Model.extend({
  email: DS.attr('string', { defaultValue: 'not setup' }),
  password: DS.attr('string', { defaultValue: 'not setup' }),
  admin: DS.attr('boolean', { defaultValue: false }),
  employee:   belongsTo('employee')
});
