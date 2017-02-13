import Ember from 'ember';

// references https://guides.emberjs.com/v2.11.0/tutorial/service/

export default Ember.Component.extend({
  maps: Ember.inject.service(),

  didInsertElement() {
    this._super(...arguments);

    let location = this.get('location');

    let mapElement = this.get('maps').getMapElement(location);
    this.$('.map-container').append(mapElement);
  }
});
