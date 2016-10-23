import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  password: DS.attr('string'),
  remember_me: DS.attr('boolean', { defaultValue: false })
});
