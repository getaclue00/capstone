// this was done as per http://discuss.emberjs.com/t/generated-unit-test-for-application-serializer-fails/10662/4
// this appears to be an actual issue = https://github.com/ember-cli/ember-cli/issues/4879
// https://github.com/switchfly/ember-test-helpers/issues/165
// https://github.com/emberjs/ember.js/issues/12402

import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import DS from 'ember-data';

moduleFor('serializer:application', 'Unit | Serializer | application', {
  // Specify the other units that are required for this test.
  needs: ['serializer:application']
});

test('it serializes records in JSON Api format', function(assert) {

  // create a dummy model for application
  let DummyModel = DS.Model.extend({
    name: DS.attr('string'),
    address: DS.attr('string'),
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    otherThing: DS.attr('string')
  });

  this.registry.register('model:application', DummyModel);

  let store = Ember.getOwner(this).lookup('service:store');

  let basicModel = {
    name: 'Test Name',
    address: 'SOme Dummy Address',
    firstName: 'Bruce',
    lastName: 'Wayne',
    otherThing: 'test'
  };

  let expectedHash = {
    data: {
      attributes: {
        name: basicModel.name,
        address: basicModel.address,
        first_name: basicModel.firstName,
        last_name: basicModel.lastName,
        other_thing: basicModel.otherThing
      },
      type: 'applications'
    }
  };

  Ember.run(function(){

    // Create an instance of DummyModel and serialize
    let serializedRecord = store.createRecord('application', basicModel).serialize();

    assert.deepEqual(serializedRecord, expectedHash);
  });

});
