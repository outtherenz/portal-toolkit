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

  selectAll: on('focusIn', function(e) {
    if (get(this, 'selectOnFocus')) {
      run.next(function() {
        this.$().select();
      }.bind(this));
    }
  }),

  sourceChange: observer('source.value', function() {
    run.next(() => {
      const isManual = get(this, 'source.isManual');

      // This line makes it work. ¯\_(ツ)_/¯
      get(this, 'source.value');

      if (!isManual) {
        this.formatValue();
      }
    });
  }),

  triggerReformat: on('init', 'focusOut', function() {
    run.next(() => this.formatValue());
  }),

  formatValue() {
    if (get(this, 'isDestroying')) {
      return;
    }

    let format = get(this, 'format');

    if (format.toLowerCase() === 'currency') {
      format = 'number';
    }

    const source = formatNumber([ format, get(this, 'source.value') ]);

    set(this, 'value', source);
  },

  valueDidChange: observer('value', function() {
    const source = formatNumber([ 'number', get(this, 'source.value') ]);
    const value = get(this, 'value');

    if (source !== value) {
      this.sendAction('manualChange', formatNumber(value, { flags: true }).parsedInput);
    }
  })
});
