import { helper } from '@ember/component/helper';

export function formatDuration([ duration ], options = {}) {
  const { abs, emptyPlaceholder = '' } = options;

  const total = isNaN(duration)
    ? 0
    : (abs ? Math.abs(Number(duration)) : Number(duration));
  let minutes = String(Math.abs(Math.round(total % 1 * 60)));
  let hours = Math[total > 0 ? 'floor' : 'ceil'](total);

  if (minutes.length < 2) {
    minutes = '0' + minutes;
  }

  // Floating point errors
  if (minutes.length > 2) {
    minutes = minutes.substring(0, 2);
  }

  if (minutes === '60') {
    hours = String(hours + 1);
    minutes = '00';
  }

  return (hours || parseInt(minutes, 10)) ? `${Math.floor(hours)}:${minutes}` : emptyPlaceholder;
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

export default helper(formatDuration);
