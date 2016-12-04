import Ember from 'ember';
import { formatNumber } from '../helpers/format-number';

const {
  TextField,
  run,
  on,
  observer,
  get,
  set
} = Ember;

export default TextField.extend({
  classNames: [ 'formatted' ],
  classNameBindings: [ 'format' ],

  number: null,
  manual: false,
  format: 'number',
  selectOnFocus: false,

  // Select all on focus, if selectOnFocus is true.
  // Does not allow the user to make their own selection.
  // http://stackoverflow.com/a/24589806/2833988
  selectAll: on('focusIn', function(event) {
    if (get(this, 'selectOnFocus')) {
      this.$().on('click keyup', () => {
        this.$().off('click keyup').select();
      });
    }
  }),

  sourceChange: observer('number', function() {
    run.next(() => {
      const isManual = get(this, 'isManual');

      // This line makes it work. ¯\_(ツ)_/¯
      get(this, 'number');

      if (!isManual) {
        this.formatValue();
      }
    });
  }),

  triggerReformat: observer('format', on('init', 'focusOut', function() {
    run.next(() => this.formatValue());
  })),

  formatValue() {
    if (get(this, 'isDestroying')) {
      return;
    }

    const format = get(this, 'format');
    const number = get(this, 'number');
    const symbol = get(this, 'currencySymbol');
    const options = {currencySymbol: symbol || ''};

    const formatted = formatNumber([ format, number ], options);

    set(this, 'value', formatted);
  },

  valueDidChange: observer('value', function() {
    const options = { currencySymbol: '' };
    const format = get(this, 'format');
    const source = formatNumber([ format, get(this, 'number') ], options);
    const value = get(this, 'value');

    if (source !== value) {
      const parsed = formatNumber([ format, value ], { flags: true }).parsedInput;

      if (format.toLowerCase() === 'percentage') {
        this.sendAction('manualChange', parsed / 100);
      } else {
        this.sendAction('manualChange', parsed);
      }
    }
  })
});
