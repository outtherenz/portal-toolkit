import Component from '@ember/component';
import { get, computed } from '@ember/object';
import layout from '../../templates/components/search-select/item';

export default Component.extend({
  layout,
  classNames: ['search-select__drop-down__row'],
  classNameBindings: ['isSelected:search-select__drop-down__row--selected'],
  isSelected: computed('selectedRow', 'index', function() {
    return get(this, 'selectedRow') === get(this, 'index');
  }),
  displayName: computed('option', 'keys', 'separator', function() {
    const option = get(this, 'option');
    if (typeof option === 'string') return option;
    const keys = get(this, 'keys');
    const separator = get(this, 'separator');

    const getDisplayName = get(this, 'getDisplayName');
    const displayName = getDisplayName(keys, option, separator);

    return displayName;
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
