import Ember from 'ember';

export function formatDuration([ duration ]) {
  const total = isNaN(duration) ? 0 : Number(duration);
  let minutes = String(Math.abs(Math.round(total % 1 * 60)));
  const hours = Math[total > 0 ? 'floor' : 'ceil'](total);

  if (minutes.length < 2) {
    minutes = '0' + minutes;
  }

  // Floating point errors
  if (minutes.length > 2) {
    minutes = minutes.substring(0, 2);
  }

  return (hours || parseInt(minutes, 10)) ? `${Math.floor(hours)}:${minutes}` : '';
}

export function parseDuration(duration) {
  // Null input
  if ([ null, undefined, '' ].includes(duration)) {
    return null;
  }

  if (!isNaN(duration)) return Number(duration);

  const parts = duration
  .replace('.', ':')
  .replace(/[^0-9:-]+/g, '')
  .split(':');

  // Invalid input
  if (!parts.find(p => p !== '') || parts.length === 0) {
    return null;
  }

  const [ hours, minutes = 0 ] = parts.map(str => Number(str));

  return hours + (hours >= 0 ? 1 : -1) * minutes / 60;
}

export default Ember.Helper.helper(formatDuration);
