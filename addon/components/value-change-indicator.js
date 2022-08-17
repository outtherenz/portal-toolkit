import Component from '@ember/component';
import { get, computed } from '@ember/object';
import layout from '../templates/components/value-change-indicator';

export default Component.extend({
  layout,

  tagName: 'span',
  classNames: [ 'value-change-indicator' ],
  classNameBindings: [ 'color' ],

  // You can provide either from and to, or just difference
  from: null,
  to: null,
  difference: null,
  positiveIcon: 'arrow-up',
  negativeIcon: 'arrow-down',

  useColor: true,
  increaseIsGood: true,

  _diff: computed('from', 'to', 'difference', function() {
    const from = this.from;
    const to = this.to;
    const difference = this.difference;

    if (difference != null) {
      return difference;
    }

    return to - from;
  }),

  color: computed('_diff', function() {
    const diff = this._diff;
    const increaseIsGood = this.increaseIsGood;
    const useColor = this.useColor;

    if (!useColor) {
      return;
    }

    if ((increaseIsGood && diff > 0) || (!increaseIsGood && diff < 0)) {
      return 'value-change-indicator--good';
    } else if ((increaseIsGood && diff < 0) || (!increaseIsGood && diff > 0)) {
      return 'value-change-indicator--bad';
    } else {
      return 'value-change-indicator--no-change';
    }
  }),

  icon: computed('_diff', 'positiveIcon', 'negativeIcon', function() {
    const diff = this._diff;

    if (diff > 0) {
      return this.positiveIcon;
    } else if (diff < 0) {
      return this.negativeIcon;
    }

    return '';
  })
});
