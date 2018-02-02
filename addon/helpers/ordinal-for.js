import Helper from '@ember/component/helper';

export function ordinalFor(input) {
  const number = Number(input);

  if (isNaN(number) || Math.abs(number) === Infinity || number < 0) {
    return null;
  }

  const string = String(number);
  const lastDigit = string.charAt(string.length - 1);

  if (string.indexOf('.') > -1 || string.indexOf('e') > -1) {
    return null;
  } else if (lastDigit === '1' && string !== '11') {
    return 'st';
  } else if (lastDigit === '2' && string !== '12') {
    return 'nd';
  } else if (lastDigit === '3' && string !== '13') {
    return 'rd';
  } else {
    return 'th';
  }
}

export default Helper.helper(ordinalFor);
