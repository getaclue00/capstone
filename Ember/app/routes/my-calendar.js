import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    // Unfortunately, we need to do this conversion, until we can figure out why the model is not displayed without this conversion...

    let events = [];

    this.get('store').findAll('appointment').then((items) => {
      items.forEach((item) => {
        events.pushObject({
          id    : item.get('id'),
          title : item.get('title'),
          start : item.get('start'),
          end   : item.get('end'),
          color : item.get('color'),
          textColor: item.get('textColor')
        });
      });
    });

    return events;
  }
});
