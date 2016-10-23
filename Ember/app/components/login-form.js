import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service(),

  actions: {
    authenticate() {
      let { email, password } = this.get('model').getProperties('email', 'password');

      this.get('session')
       .authenticate('authenticator:devise',
          email, password)
       .catch((reason) => {
         this.set('errorMessage', reason.error || reason);
       });
   }
 }
});
