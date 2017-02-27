import Ember from 'ember';

// references https://guides.emberjs.com/v2.11.0/tutorial/service/

export default Ember.Object.extend({

  init() {
    var self = this;
    const YOUR_API_KEY = `AIzaSyDEWaRXiLXN3NRdA_przlmnz7z69C7X0Bg`;
    Ember.$.getScript(`https://maps.googleapis.com/maps/api/js?v=3&key=${YOUR_API_KEY}`).done(() => {
      self.set('geocoder', new window.google.maps.Geocoder());
    });
  },

  createMap(element, location) {
    setTimeout(() => {
      let map = new window.google.maps.Map(element, { scrollwheel: false, zoom: 15 });
      this.pinLocation(location, map);
      return map;
    }, 1000);
  },

  pinLocation(location, map) {
    this.get('geocoder').geocode({address: location}, (result, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        let geometry = result[0].geometry.location;
        let position = { lat: geometry.lat(), lng: geometry.lng() };
        map.setCenter(position);
        new window.google.maps.Marker({ position, map, title: location });
      }
    });
  }

});
