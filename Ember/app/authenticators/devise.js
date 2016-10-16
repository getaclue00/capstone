import Ember from 'ember';
import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';

const { RSVP: { Promise }, isEmpty, run, $: jQuery, assign: emberAssign, merge } = Ember;
const assign = emberAssign || merge;

export default DeviseAuthenticator.extend({
  serverTokenEndpoint: 'http://localhost:3000/users/sign_in',
  serverTokenLogoutEndPoint: 'http://localhost:3000/users/sign_out',

  invalidate() {
    return new Promise((resolve, reject) => {
      const serverTokenLogoutEndPoint = this.get('serverTokenLogoutEndPoint');

      let requestOptions = {};

      assign(requestOptions, {
        url:      serverTokenLogoutEndPoint,
        type:     'DELETE',
        dataType: 'json'
      });

      return jQuery.ajax(requestOptions).then(
        (response) => {
            run(null, resolve, response);
        },
        (xhr) => run(null, reject, useXhr ? xhr : (xhr.responseJSON || xhr.responseText))
      );
    });
  }
});
