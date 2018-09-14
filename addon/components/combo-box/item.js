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
  displayName: computed('option', 'searchKeys', 'separator', function() {
    const option = get(this, 'option');
    const searchKeys = get(this, 'searchKeys');
    const separator = get(this, 'separator');

    const getDisplayName = get(this, 'getDisplayName');
    const displayName = getDisplayName(searchKeys, option, separator);

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
