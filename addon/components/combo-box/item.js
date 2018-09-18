import Component from '@ember/component';
import { get, computed } from '@ember/object';
import layout from '../../templates/components/combo-box/item';

export default Component.extend({
  layout,

  classNames: ['combo-box__drop-down__row'],
  classNameBindings: ['isSelected:combo-box__drop-down__row--selected'],
  isSelected: computed('selectedRow', 'index', function() {
    return get(this, 'selectedRow') === get(this, 'index');
  }),
  displayName: computed('option', 'key', function() {
    const option = get(this, 'option');
    if (typeof option === 'string') return option;
    const key = get(this, 'key');

    return get(option, key);
  }),

  click: function() {
    this.sendAction('setItem', get(this, 'index'));
  },
  mouseEnter: function() {
    this.sendAction('setHighlight', get(this, 'index'));
  },
  mouseLeave: function() {
    this.sendAction('unSetHighlight', get(this, 'index'));
  }
});
