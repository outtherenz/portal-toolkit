import Ember from 'ember';

const { Helper } = Ember;

export function formatNumber(input, options) {
  options = options || {};

  const number = standardizeInput(input);

  // NaN
  if (isNaN(number)) {
    return finalize('', input, number, options);
  }

  // Dash zero
  if (options.dashZero !== false && number === 0) {
    return finalize('\u2013', input, number, options);
  }

  // Too large or small
  if (number > 9007199254740991 || number < -9007199254740991) {
    return finalize('#', input, number, options);
  }

  // Convert sigfigs option to a places option
  const places = calcPlaces(number, options);

  // First round the number
  const rounded = round(number, places);

  // Add zeros to meet decimal places requirement
  const padded = pad(rounded, places);

  // Add commas
  const commaed = addCommas(padded);

  // Nice minus sign and slight space
  const formatted = formatNegativeSign(commaed);

  return finalize(formatted, input, rounded, options);
}

function finalize(formatted, input, number, options) {
  if (!options.flags) {
    return formatted;
  }

  const res = {
    formatted,
    raw: input,
    parsedInput: number,
    isNaN: typeof formatted !== 'string' || formatted.match(/\d/) === null,
    isZero: input === 0,
    roundsToZero: number === 0,
    isNegative: !isNaN(number) && number < 0
  };

  return res;
}

function standardizeInput(input) {
  if (typeof input !== 'string') {
    return input == null ? NaN : Number(input);
  } else if (input === '-' || input === '\u2013') {
    return 0;
  } else {
    return parseFloat(input.replace('\u2212\u2009', '-').replace(/[^\d.-]*/g, ''));
  }
}

function calcPlaces(number, options) {
  if (options.places != null) {
    return (typeof options.places === 'number') ? options.places : 2;
  } else if (options.sigfigs != null) {
    return (typeof options.sigfigs === 'number') ? options.sigfigs - Math.abs(Math.floor(number)).toString().length : 3;
  } else {
    return 2;
  }
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
    string = '\u2212\u2009' + string.substr(1);
  }

  return string;
}

export default Helper.helper(formatNumber);
