import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  appointments: hasMany('appointment')
});
