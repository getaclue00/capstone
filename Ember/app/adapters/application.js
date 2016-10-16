import Ember from 'ember';
import DS from 'ember-data';

const { underscore, pluralize } = Ember.String;

export default DS.JSONAPIAdapter.extend({
  authorizer: 'authorizer:devise',
  host: 'http://localhost:3000',

  pathForType: function(type) {
    let underscored = underscore(type);
    return pluralize(underscored);
  }
});
