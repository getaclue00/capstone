import { JSONAPISerializer } from 'ember-cli-mirage';
import Ember from 'ember';
const { underscore } = Ember.String;

export default JSONAPISerializer.extend({

  keyForAttribute(attr) {
    return underscore(attr);
  }

});
