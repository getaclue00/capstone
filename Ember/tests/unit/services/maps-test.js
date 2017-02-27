import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

// references https://guides.emberjs.com/v2.11.0/tutorial/service/

const DUMMY_ELEMENT = {};

let MapUtilStub = Ember.Object.extend({
  createMap(element, location) {
    this.assert.ok(element, 'createMap called with element');
    this.assert.ok(location, 'createMap called with location');
    return DUMMY_ELEMENT;
  }
});

moduleFor('service:maps', 'Unit | Service | maps', {
  needs: ['util:google-maps']
});

test('should create a new map if one isnt cached for location', function(assert) {
  assert.expect(4);
  let stubMapUtil = MapUtilStub.create({ assert });
  let mapService = this.subject({ mapUtil: stubMapUtil });
  let element = mapService.getMapElement('174 Bank St, Ottawa, On');
  assert.ok(element, 'element exists');
  assert.equal(element.className, 'map', 'element has class name of map');
});

test('should use existing map if one is cached for location', function(assert) {
  assert.expect(1);
  let stubCashedMaps = Ember.Object.create({
    capstone174BankStOttawaOn: DUMMY_ELEMENT
  });
  let mapService = this.subject({ cachedMaps: stubCashedMaps });
  let element = mapService.getMapElement('174 Bank St, Ottawa, On');
  assert.equal(element, DUMMY_ELEMENT, 'element fetched from cache');
});
