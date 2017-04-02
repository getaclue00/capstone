import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service }, Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  ajax: service(),
  session: service(),

  model(params) {
    let id = params.appointments_id;
    let url = `https://radetailing.herokuapp.com/api/appointments?version%5Bid%5D=${id}`;

    const sessionData = this.get('session');
    const userToken = sessionData.get('data.authenticated.token');
    const userIdentification = sessionData.get('data.authenticated.email');
    const authData = `token="${userToken}", email="${userIdentification}"`;

    let options = {
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Accept", "application/vnd.api+json");
        xhr.setRequestHeader("Authorization", `Token ${authData}`);
      }
    };

    return this.get('ajax').request(url, options).then(result => {
      return result.appointments;
    });
  },

  setupController: function(controller, model) {
    controller.set('model', model);
  },

  actions: {
    didTransition() {
      Ember.run.schedule('afterRender', this, () => {
        Ember.$('#history-table').DataTable({
        });
      });
    }
  }
});
