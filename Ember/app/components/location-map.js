import Ember from 'ember';

export default Ember.Component.extend({
  // maps: Ember.inject.service(),

  didInsertElement() {
    this._super(...arguments);

    let location = escape(this.get('location'));

    let locationString = `https://maps.google.com/maps?q=${location}&amp;ie=UTF8&output=embed`;

    // let mapElement = this.get('maps').getMapElement(location);

    let mapElement = document.createElement('iframe');

    mapElement.setAttribute('scrolling', 'no');
    mapElement.setAttribute('width', '100%');
    mapElement.setAttribute('height', '100%');
    mapElement.setAttribute('frameborder', '0');
    mapElement.setAttribute('marginheight', '0');
    mapElement.setAttribute('marginwidth', '0');
    mapElement.setAttribute('src', locationString);

    this.$('.map-container').append(mapElement);
  }
});
