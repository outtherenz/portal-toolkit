import Component from '@ember/component';
import { set, get, computed, observer } from '@ember/object';
import { on } from '@ember/object/evented';
import $ from 'jquery';
import layout from '../templates/components/combo-box';

// to lower case
function tlc(string) {
  return String(string).toLowerCase();
}

export default Component.extend({
  layout,

  classNames: ['combo-box'],
  finderVisible: false,
  selectedRow: 0,
  searchTerm: '',

  // capture click events and check if they are for our component
  // if they are not, we can close the drop down
  initOutsideClickEventObserver: on('didInsertElement', function() {
    const element = get(this, 'elementId');
    $(window).on('click', event => {
      if (
        $(`#${element}`).has(event.target).length === 0 &&
        !$(`#${element}`).is(event.target)
      ) {
        if (!get(this, 'searchOnly')) this.send('setItem');
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
  clearInputOnSearchOnlyFocus: observer('searchOnly', 'finderVisible', function() {
    if (get(this, 'searchOnly') && get(this, 'finderVisible')) {
      set(this, 'searchTerm', '');
    }
  }),

  _searchKeys: computed('searchKeys', function() {
    const searchKeys = get(this, 'searchKeys').split(',').map(item => item.trim());
    return searchKeys;
  }),

  filteredOptions: computed('_searchKeys', 'options', 'searchTerm', function() {
    const searchKeys = get(this, '_searchKeys');
    const searchTerm = get(this, 'searchTerm');
    const options = get(this, 'options');

    if (searchTerm) {
      const filteredOptions = options.filter(option =>
        searchKeys.find(key => {
          return tlc(get(option, key)).indexOf(tlc(searchTerm)) !== -1;
        })
      );
      return filteredOptions;
    }
    return options;
  }),

  activeDisplayName: computed('value', 'options', 'separator', function() {
    const value = get(this, 'value');
    if (!value) return '';
    const searchKeys = get(this, '_searchKeys');

    // find the currently selected value from the options
    const selected = get(this, 'options').find(option =>
      searchKeys.every(key =>
        // if the supplied value is an object check the value at the key, otherwise use the plain value
        tlc(get(option, key)) === (this.isObject(value) ? tlc(get(value, key)) : tlc(value))
      )
    );

    // if we can't find an item in the options, we can assume it's new and return the value
    // this becomes an issue if you're iterating through an options array which doesn't have
    // a direct relationship to the value you're setting
    if (!get(this, 'searchOnly') && !selected && !this.isObject(value)) {
      return value;
    } else if (!selected) return '';

    const separator = get(this, 'separator');

    return this.getDisplayName(searchKeys, selected, separator);
  }),

  actions: {
    setFinderVisible(visible) {
      set(this, 'finderVisible', visible);
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
      // when the index is negative, the new item value is in the searchTerm
      const item = index >= 0 ? get(this, 'filteredOptions').objectAt(index) : get(this, 'searchTerm');
      const value = get(this, 'value');

      if (this.isObject(value)) {
        set(this, 'value', item);
      } else {
        // default set key to name
        const key = get(this, 'key') || 'name';
        if (this.isObject(item)) {
          set(this, 'value', get(item, key));
        } else {
          set(this, 'value', item);
        }
      }

      const activeValue = get(this, 'activeDisplayName');
      set(this, 'searchTerm', activeValue);
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
