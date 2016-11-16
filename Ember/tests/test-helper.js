import resolver from './helpers/resolver';

import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

import registerSelectHelper from './helpers/register-select-helper';

registerSelectHelper();
