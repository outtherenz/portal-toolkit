import Ember from 'ember';
import { formatNumber, parseNumber } from '../helpers/format-number';

const {
  TextField,
  computed,
  get,
  set,
  run,
  on
} = Ember;

export default TextField.extend({
  classNames: [ 'formatted-input' ],
  classNameBindings: [ 'formatClassName' ],

  /**
   * The value to be formatted and displayed in the input.
   *
   * @type {Number}
   */
  number: null,

  /**
   * When true, the formatted value will be swapped for the raw value on focus, and
   * swapped back on blur.
   *
   * @type {Boolean}
   * @default true if format is 'number' or 'currency'
   */
  editRawValue: computed('format', function() {
    return [ 'number', 'currency' ].includes(get(this, 'format').toLowerCase());
  }),

  /**
   * Select the contents of the input on focus. Ignored if `editRawValue` is true.
   *
   * @type {Boolean}
   * @default true
   */
  selectOnFocus: true,

  /**
   * If provided, this action will be called on blur after the user changes the parsed
   * value of the input to something other than the current number. The action you provide
   * should update `number`.
   *
   * If you don't provide an action, `number` will be set for you.
   *
   * @type {Function}
   */
  update: null,

  /**
   * The format to pass to the default formatter. If you provide your own formatter,
   * this is only used in the component's class name.
   *
   * @type {String}
   * @default 'number'
   */
  format: 'number',

  /**
   * A function to convert a number to a formatted string.
   *
   * @type {Function}
   * @param {Number} value - The number to format.
   * @return {String} - The formatted number.
   * @default `formatNumber` helper
   */
  formatter: computed('format', function() {
    const format = get(this, 'format');

    return function(value, options) {
      return formatNumber([ format, value ], options);
    };
  }),

  /**
   * A value to be passed as a second argument to the formatter
   *
   * @default null
   */
  formatterOptions: null,

  /**
   * A function to covert a formatted string to a number.
   *
   * @type {Function}
   * @param {String} value - The formatted string.
   * @return {Number} - The parsed number.
   */
  parser: parseNumber,

  /**
   * A value to be passed as a second argument to the parser
   *
   * @default null
   */
  parserOptions: null,

  /**
   * @type {String}
   */
  formatClassName: computed('format', function() {
    const format = get(this, 'format').toLowerCase();
    return `formatted-input--${format}`;
  }),

  /**
   * Select all on focus, if selectOnFocus or editRawValue is true.
   * Does not allow the user to make their own selection.
   * http://stackoverflow.com/a/24589806/2833988
   */
  selectAll: on('focusIn', function() {
    const editRawValue = get(this, 'editRawValue');
    const selectOnFocus = get(this, 'selectOnFocus');

    if (editRawValue) {
      set(this, 'value', get(this, 'number'));
    }

    if (editRawValue || selectOnFocus) {
      this.$().on('click keyup', () => {
        run(() => this.$().off('click keyup').select());
      });
    }
  }),

  /**
   * Set the value of the input to the formatted `number`.
   */
  displayFormattedValue: on('didReceiveAttrs', function() {
    const number = get(this, 'number');
    const formatter = get(this, 'formatter');
    const options = get(this, 'formatterOptions');

    run.next(() => set(this, 'value', formatter(number, options)));
  }),

  /**
   * On focus out, this function will do one of three things:
   *
   *  - If the parsed number is the same as the original number, it will
   *    call `this.displayFormattedValue()` causing the raw value to be
   *    replaced with the formatted value if `editRawValue` is true.
   *  - Otherwise, if an update function has been provided, it will be called
   *    with the updated number.
   *  - Otherwise, the number with be updated. This will trigger a
   *    `didReceiveAttrs` event.
   */
  handleUpdate: on('focusOut', function() {
    const value = get(this, 'value');
    const current = get(this, 'number');
    const parser = get(this, 'parser');
    const options = get(this, 'parserOptions');
    const parsed = parser(value, options);
    const number = isNaN(parsed) ? null : parsed;

    if (number === current) {
      this.displayFormattedValue();
    } else if (typeof get(this, 'update') === 'function') {
      this.sendAction('update', number);
    } else {
      set(this, 'number', number);
    }
  })
});
