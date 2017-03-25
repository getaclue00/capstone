import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service }, Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  ajax: service(),

  model(params) {
    let id = params.appointments_id;
    let url = `https://radetailing.herokuapp.com/api/appointments?version%5Bid%5D=${id}`;
    let options = {
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Accept", "application/vnd.api+json");
      }
    };
    return this.get('ajax').request(url, options).then(result => {
      return result.appointments;
    });
  },

  setupController: function(controller, model) {
    controller.set('model', model);
  }
});
