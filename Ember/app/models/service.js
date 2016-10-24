import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string', { defaultValue: '' }),
  duration: DS.attr('int', { defaultValue: '60.00' }),
  price_small: DS.attr('double', { defaultValue: '100.00' }),
  price_large: DS.attr('double', { defaultValue: '120.00' }),
  description: DS.attr('string', { defaultValue: '...' }),
});
