import Component from '@ember/component';
import { set, get, computed, observer } from '@ember/object';
import { on } from '@ember/object/evented';
import $ from 'jquery';
import layout from '../templates/components/search-select';

// to lower case
function tlc(string) {
  return String(string).toLowerCase();
}

export default Component.extend({
  layout,

  classNames: ['search-select'],
  finderVisible: false,
  selectedRow: 0,
  searchTerm: '',

  // capture click events and check if they are for our component
  // if they are not, we can close the drop down
  initOutsideClickEventObserver: on('didInsertElement', function() {
    const element = get(this, 'elementId');
    $(window).on('click', event => {
      if (
        get(this, 'finderVisible') &&
        $(`#${element}`).has(event.target).length === 0 &&
        !$(`#${element}`).is(event.target)
      ) {
        set(this, 'finderVisible', false);
      }
    });
  }),

  // remove our listener
  willDestroyElement() {
    $(window).off('click');
  },

  didInsertElement() {
    // we need to set the value on the initial render
    const activeValue = get(this, 'activeDisplayName');
    set(this, 'searchTerm', activeValue);
  },
  didRender() {
    // for following renders we only want to set the value when the search is not being used and the value has changed
    const finderVisible = get(this, 'finderVisible');
    if (finderVisible) return;

    const activeValue = get(this, 'activeDisplayName');
    if (activeValue !== get(this, 'searchTerm')) set(this, 'searchTerm', activeValue);
  },

  // we want to automatically clear the input when the input is search only
  // ie when the input cannot create its own values
  clearInputOnFocus: observer('finderVisible', function() {
    if (get(this, 'finderVisible')) set(this, 'searchTerm', '');
  }),

  _keys: computed('keys', function() {
    return get(this, 'keys') && get(this, 'keys').split(',').map(item => item.trim());
  }),

  filteredOptions: computed('_keys', 'options', 'searchTerm', function() {
    const keys = get(this, '_keys');
    const searchTerm = get(this, 'searchTerm');
    const options = get(this, 'options');

    if (searchTerm) {
      return options.filter(option => {
        if (this.isObject(option)) {
          return keys.find(key =>
            tlc(get(option, key)).indexOf(tlc(searchTerm)) !== -1
          );
        } else {
          return tlc(option).indexOf(tlc(searchTerm)) !== -1;
        }
      });
    }
    return options;
  }),

  activeDisplayName: computed('value', 'options', 'separator', function() {
    const value = get(this, 'value');
    if (!value) return '';
    if (!this.isObject(value)) return value;

    const keys = get(this, '_keys');

    // find the currently selected value from the options
    const selected = get(this, 'options').find(option =>
      keys.every(key =>
        tlc(get(option, key)) === tlc(this.isObject(value) ? get(value, key) : value)
      )
    );

    if (!selected) return '';

    const separator = get(this, 'separator');

    return this.getDisplayName(keys, selected, separator);
  }),

  actions: {
    setFinderVisible(visible) {
      if (get(this, 'finderVisible') !== visible) set(this, 'finderVisible', visible);
    },
    keyDown(event) {
      const selectedRow = get(this, 'selectedRow');
      switch (event.keyCode) {
        // down arrow
        case 38:
          if (selectedRow > 0) set(this, 'selectedRow', selectedRow - 1);
          break;
        // up arrow
        case 40:
          if (selectedRow + 1 < get(this, 'filteredOptions.length')) set(this, 'selectedRow', selectedRow + 1);
          break;
        // enter
        case 13:
          if (get(this, 'finderVisible')) this.send('setItem', selectedRow);
          break;
        // tab
        case 9:
          this.send('setFinderVisible', false);
          break;
        // escape
        case 27:
          this.send('setFinderVisible', false);
          break;
        // any other key
        default:
          set(this, 'selectedRow', -1);
          this.send('setFinderVisible', true);
          break;
      }
    },
    setHighlight(index) {
      set(this, 'selectedRow', index);
    },
    unSetHighlight(index) {
      if (get(this, 'selectedRow') === index) set(this, 'selectedRow', null);
    },
    setItem(index) {
      const item = get(this, 'filteredOptions').objectAt(index);

      this.sendAction('onSelect', item);
      this.send('setFinderVisible', false);
    },
    clearValue() {
      set(this, 'value', null);
      set(this, 'finderVisible', false);
    }
  },
  isObject(value) {
    return typeof value === 'object';
  },
  getDisplayName(keys, option, separator) {
    // separator defaults to ' - '
    // go through each key and build the display name by getting the values at the key
    return keys.reduce((name, key, i) =>
      i > 0 ? name += `${separator ? separator : ' - '}${get(option, key)}` :
        name = get(option, key)
      , '');
  }
});
