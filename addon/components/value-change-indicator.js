import Ember from 'ember';
import layout from '../templates/components/value-change-indicator';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  layout,

  tagName: 'span',
  classNames: [ 'value-change-indicator' ],
  classNameBindings: [ 'color' ],

  // You can provide either from and to, or just difference
  from: null,
  to: null,
  difference: null,

  useColor: true,
  increaseIsGood: true,

  _diff: computed('from', 'to', 'difference', function() {
    const from = get(this, 'from');
    const to = get(this, 'to');
    const difference = get(this, 'difference');

    if (difference != null) {
      return difference;
    }

    return to - from;
  }),

  color: computed('account1', 'account2', '_diff', function() {
    const diff = get(this, '_diff');
    const increaseIsGood = get(this, 'increaseIsGood');
    const useColor = get(this, 'useColor');

    if (!useColor) {
      return;
    }

    if (diff > 0 === increaseIsGood) {
      return 'good';
    } else if (diff < 0 === increaseIsGood) {
      return 'bad';
    } else if (diff === 0) {
      return 'no-change';
    }
  }),

  icon: computed('_diff', function() {
    const diff = get(this, '_diff');

    if (diff > 0) {
      return 'fa-arrow-up';
    } else if (diff < 0) {
      return 'fa-arrow-down';
    }

    return '';
  })
});
