import resolver from './helpers/resolver';
import { setResolver } from 'ember-qunit';
import registerSelectHelper from './helpers/register-select-helper';
import { start } from 'ember-cli-qunit';

setResolver(resolver);
registerSelectHelper();
start();
