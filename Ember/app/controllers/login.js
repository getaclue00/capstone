import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  ajax: service(),
  session: service()
});
