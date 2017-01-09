import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string', { defaultValue: 'not setup' }),
  password: DS.attr('string', { defaultValue: 'not setup' }),
  admin: DS.attr('boolean', { defaultValue: false }),
});
