import resolver from './helpers/resolver';
import { setResolver } from 'ember-qunit';
import registerSelectHelper from './helpers/register-select-helper';

setResolver(resolver);
registerSelectHelper();
