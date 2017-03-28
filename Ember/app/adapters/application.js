import Ember from 'ember';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const { underscore, pluralize } = Ember.String;

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:devise',

  pathForType: function(type) {
    let underscored = underscore(type);
    return pluralize(underscored);
  },

  //overriding the defalt behaviour which returns true is status is 422
  isInvalid(status) {
    return status === 400;
  },
  // handleResponse: function(status, headers, payload){
  //   if(status === 400 && payload.errors){
  //     return new DS.InvalidError(payload.errors);
  //   }
  //   return this._super(...arguments);
  // }

});
