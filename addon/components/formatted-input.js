import Ember from 'ember';
import { formatNumber } from '../helpers/fmt-number';
import { formatPercentage } from '../helpers/fmt-percentage';

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

    const format = this.get('format');
    let source = this.get('source.value');

    switch (format) {
      case 'INTEGER':
        source = formatNumber(source, { places: 0 });
        break;
      case 'CURRENCY':
        source = formatNumber(source);
        break;
      case 'PERCENTAGE':
        source = formatPercentage(source);
        break;
      default:
        source = formatNumber(source);
    }

    this.set('value', source);
  },

  valueDidChange: observer('value', function() {
    const source = formatNumber(this.get('source.value'));
    const value = this.get('value');

    if (source !== value) {
      this.sendAction('manualChange', formatNumber(value, { flags: true }).parsedInput);
    }
  })
});
