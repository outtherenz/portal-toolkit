import { isArray } from '@ember/array';
import Helper from '@ember/component/helper';

const MINUS_SIGN = '\u2212\u2009';
const DASH = '\u2013';
const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

export function formatNumber(params, options) {
  options = options || {};

  const [formatAs, number, rawNumber] = standardizeInput(params);

  // Defaults

  // NaN
  if (isNaN(number)) {
    return finalize('', formatAs, number, rawNumber, options);
  }

  // Too large or small
  if (number < MIN_SAFE_INTEGER || number > MAX_SAFE_INTEGER) {
    return finalize('#', formatAs, number, rawNumber, options);
  }

  // Convert sigfigs option to a places option
  const places = calcPlaces(number, formatAs, options);

  // First round the number
  const rounded = round(number, places);

  // Dash zero (after rounding)
  if (options.dashZero !== false && Number(rounded) === 0) {
    return finalize(DASH, formatAs, rounded, rawNumber, options);
  }

  // Add zeros to meet decimal places requirement
  const padded = pad(rounded, places);

  // Add commas
  const commaed = addCommas(padded);

  // Nice minus sign and slight space
  const formatted = formatNegativeSign(commaed);

  return finalize(formatted, formatAs, rounded, rawNumber, options);
}

function finalize(formatted, formatAs, number, rawNumber, options) {
  if (typeof formatted === 'string' && formatted.match(/\d/) !== null) {
    formatted = applyDecoration(formatted, formatAs, options.currencySymbol);
  }

  if (!options.flags) {
    return formatted;
  }

  if (formatAs === 'percentage') {
    number /= 100;
  }

  const res = {
    formatted,
    raw: rawNumber,
    parsedInput: number,
    isNaN: typeof formatted !== 'string' || formatted.match(/\d/) === null,
    isZero: rawNumber === 0,
    roundsToZero: number === 0,
    isNegative: !isNaN(number) && number < 0
  };

  return res;
}

function standardizeInput(input) {
  let formatAs, value;

  if (!isArray(input) || input.length === 1) {
    value = isArray(input) ? input[0] : input;
    formatAs = 'number';
  } else {
    [formatAs, value] = input;
  }

  formatAs = typeof formatAs === 'string' ? formatAs.toLowerCase() : 'number';
  const rawValue = value;

  if (typeof value !== 'string') {
    value = value == null || typeof value === 'boolean' ? NaN : Number(value);
  } else if (value === '-' || value === DASH) {
    value = 0;
  } else {
    value = parseFloat(value.replace(MINUS_SIGN, '-').replace(/[^\d.-]*/g, ''));
  }

  if (formatAs === 'percentage' && !isNaN(value)) {
    value *= 100;
  }

  return [formatAs, value, rawValue];
}

function calcPlaces(number, formatAs, options) {
  if (typeof options.places === 'number' && formatAs !== 'integer') {
    return options.places;
  }

  if (typeof options.sigfigs === 'number') {
    return options.sigfigs - Math.abs(Math.floor(number)).toString().length;
  }

  if (formatAs === 'integer') {
    return 0;
  }

  return 2;
}

function round(number, places) {
  const factor = Math.pow(10, places);
  return Math.round(number * factor) / factor;
}

function pad(number, places) {
  // Convert to string
  let string = number.toString();

  if (places > 0) {
    // Add a decimal point, if one doesn't already exist
    if (string.indexOf('.') === -1) {
      string += '.';
    }

    // Find the decimal point
    const pointIndex = string.indexOf('.');

    // Keep adding zeros until we reach the end
    while (string.length <= pointIndex + places) {
      string += '0';
    }
  }

  return string;
}

function addCommas(string) {
  var chars = string.split('');
  var pointIndex = chars.indexOf('.');
  var left = [];
  var right = [];

  if (pointIndex === -1) {
    left = chars.reverse();
  } else {
    left = chars.slice(0, pointIndex).reverse();
    right = chars.slice(pointIndex + 1);
  }

  string = '';

  // Left of decimal point
  for (let i = 0, len = left.length; i < len; i++) {
    if (i >= 3 && i % 3 === 0 && left[i] !== '-') {
      string = ',' + string;
    }
    string = left[i] + string;
  }

  if (right.length) {
    string = string + '.';

    // Right of decimal point
    for (let j = 0, len = right.length; j < len; j++) {
      if (j >= 3 && j % 3 === 0) {
        string = string + ',';
      }
      string = string + right[j];
    }
  }

  return string;
}

function formatNegativeSign(string) {
  if (string[0] === '-') {
    string = MINUS_SIGN + string.substr(1);
  }

  return string;
}

function applyDecoration(string, formatAs, currencySymbol = '$') {
  if (!string) {
    return '';
  }

  switch (formatAs) {
    case 'percentage':
      return string + '%';

    case 'currency':
      return addCurrencySymbol(string, currencySymbol);

    case 'number':
    case 'integer':
    default:
      return string;
  }
}

function addCurrencySymbol(string, symbol) {
  // Negative values should be formatted like -$1.50 not $-1.50
  if (string.indexOf(MINUS_SIGN) === 0) {
    return MINUS_SIGN + (symbol || '') + string.substr(MINUS_SIGN.length);
  } else {
    return (symbol || '') + string;
  }
}

export function parseNumber(input) {
  if (typeof input !== 'string') {
    return input == null || typeof input === 'boolean' ? NaN : Number(input);
  }

  const string = input.trim();

  if (string === '-' || string === DASH) {
    return 0;
  }

  const isPercentage = string.match(/%$/) !== null;
  const number = parseFloat(string.replace(MINUS_SIGN, '-').replace(/[^\d.-]*/g, ''));

  return isPercentage && !isNaN(number) ? number / 100 : number;
}

export default Helper.helper(formatNumber);
