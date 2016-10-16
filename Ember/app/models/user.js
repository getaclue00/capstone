import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string', { defaultValue: 'not setup' }),
  password: DS.attr('string', { defaultValue: 'not setup' }),
  first_name: DS.attr('string', { defaultValue: 'not setup' }),
  last_name: DS.attr('string', { defaultValue: 'not setup' }),
  telephone: DS.attr('string', { defaultValue: 'not setup' }),
  admin: DS.attr('boolean', { defaultValue: false }),
  employee: DS.attr('boolean', { defaultValue: false }),
  client: DS.attr('boolean', { defaultValue: false })
});
