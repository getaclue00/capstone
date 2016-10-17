import Ember from 'ember';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const { underscore, pluralize } = Ember.String;

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:devise',
  host: 'http://localhost:3000',

  pathForType: function(type) {
    let underscored = underscore(type);
    return pluralize(underscored);
  }
});
