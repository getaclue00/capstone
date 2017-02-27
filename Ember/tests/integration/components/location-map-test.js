import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

// references https://guides.emberjs.com/v2.11.0/tutorial/service/

let stubMapsService = Ember.Service.extend({
  getMapElement(location) {
    this.set('calledWithLocation', location);
    return document.createElement('div');
  }
});

moduleForComponent('location-map', 'Integration | Component | location map', {
  integration: true,
  beforeEach() {
    this.register('service:maps', stubMapsService);
    this.inject.service('maps', { as: 'mapsService' });
  }
});

test('should append map element to container element', function(assert) {
  this.set('myLocation', '174 Bank St, Ottawa, On');
  this.render(hbs`{{location-map location=myLocation}}`);
  assert.equal(this.$('.map-container').children().length, 1, 'the map element should be put onscreen');
  assert.equal(this.get('mapsService.calledWithLocation'), '174 Bank St, Ottawa, On', 'a map of downtown Ottawa should be requested');
});
