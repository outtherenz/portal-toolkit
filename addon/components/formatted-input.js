import Ember from 'ember';
import { formatNumber } from '../helpers/format-number';

const { TextField, run, on, observer } = Ember;

export default TextField.extend({
  classNames: [ 'formatted' ],
  classNameBindings: [ 'format' ],

  selectAll: on('focusIn', function(e) {
    if (this.get('selectOnFocus')) {
      run.next(function() {
        this.$().select();
      }.bind(this));
    }
  }),

  sourceChange: observer('source.value', function() {
    run.next(() => {
      const isManual = this.get('source.isManual');

      // This line makes it work. ¯\_(ツ)_/¯
      this.get('source.value');

      if (!isManual) {
        this.formatValue();
      }
    });
  }),

  triggerReformat: on('init', 'focusOut', function() {
    run.next(() => {
      this.formatValue();
    });
  }),

  formatValue() {
    if (this.get('isDestroying')) {
      return;
    }

    let format = this.get('format');

    if (format.toLowerCase() === 'currency') {
      format = 'number';
    }

    const source = formatNumber([ format, this.get('source.value') ]);

    this.set('value', source);
  },

  valueDidChange: observer('value', function() {
    const source = formatNumber([ 'number', this.get('source.value') ]);
    const value = this.get('value');

    if (source !== value) {
      this.sendAction('manualChange', formatNumber(value, { flags: true }).parsedInput);
    }
  })
});
