import Ember from 'ember';
import { formatNumber } from './fmt-number';
/* global _ */

const { isArray, Helper } = Ember;

export function formatCurrency(params, hash) {
  hash = hash || {};
  const number = isArray(params) ? params[0] : params;

  if (number == null) {
    return '';
  }

  const options = _.clone(hash);
  options.flags = true;

  const result = formatNumber(number, options);

  if (!result.isNaN) {
    if (result.isNegative) {
      result.formatted = '\u2212\u2009$' + result.formatted.substr(2);
    } else {
      result.formatted = '$' + result.formatted;
    }
  }

  return hash.flags ? result : result.formatted;
}

export default Helper.helper(formatCurrency);
