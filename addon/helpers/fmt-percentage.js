import Ember from 'ember';
import { formatNumber } from 'portal/helpers/fmt-number';
/* global _ */

const { isArray, Helper } = Ember;

export function formatPercentage(params, hash) {
  hash = hash || {};
  const number = isArray(params) ? params[0] : params;

  if (number == null) {
    return '';
  }

  const options = _.clone(hash);
  options.flags = true;

  const result = formatNumber(number * 100, options);

  if (!result.isNaN) {
    result.formatted += '%';
  }

  return hash.flags ? result : result.formatted;
}

export default Helper.helper(formatPercentage);
