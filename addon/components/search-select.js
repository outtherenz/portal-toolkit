import Component from '@ember/component';
import { set, get, computed, observer } from '@ember/object';
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
  separator: ' - ',

  // This will eventually be a computed property that will be generated in the didInsertElement hook.
  activeDisplayName: null,

  // Things that need to happen once, when the element is created
  didInsertElement() {
    // capture click events and check if they are for our component
    // if they are not, we can close the drop down
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

    // we need to set the value on the initial render
    const activeValue = get(this, 'activeDisplayName');
    set(this, 'searchTerm', activeValue);

    // Generate the activeDisplayName, with dependent paths that are calculated from the passed in `keys` and `value` properties.
    const updateKeys = get(this, '_keys').map(k => 'value.' + k);
    set(this, 'activeDisplayName', computed('value', 'options[]', 'separator', ...updateKeys, function() {
      const value = get(this, 'value');
      const keys = get(this, '_keys');

      if (typeof value !== 'object') {
        return value;
      } else if (keys && get(keys, 'length') && value) {
        const separator = get(this, 'separator');
        return this.getDisplayName(keys, value, separator);
      } else {
        return '';
      }
    }));
  },

  // Things that need to happen once, when the element is destroyed
  willDestroyElement() {
    // remove our listener
    $(window).off('click');
  },

  // Things that need to happen every time the element is re-rendered
  didRender() {
    // for following renders we only want to set the value when the search is not being used and the value has changed
    const finderNotVisible = !get(this, 'finderVisible');
    const activeValue = get(this, 'activeDisplayName');
    const searchTerm = get(this, 'searchTerm');
    if (finderNotVisible && activeValue !== searchTerm) {
      set(this, 'searchTerm', activeValue);
    }
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
        if (typeof option === 'object') {
          return keys.find(key =>
            tlc(get(option, key)).includes(tlc(searchTerm))
          );
        } else {
          return tlc(option).includes(tlc(searchTerm));
        }
      });
    }
    return options;
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
          this.send('setFinderVisible', true);
          if (selectedRow > 0) set(this, 'selectedRow', selectedRow - 1);
          break;
        // up arrow
        case 40:
          this.send('setFinderVisible', true);
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

  getDisplayName(keys, option, separator) {
    // separator defaults to ' - '
    // go through each key and build the display name by getting the values at the key
    // If `option` is a Proxy Object, then the `get` function won't
    const names = keys.map(key => {
      // console.log('key', key, option, option.get(key), get(option, key), option[key]);
      return get(option, key);
    }).filter(Boolean);
    // console.log('keys', keys, option, separator, names, names.join(separator))
    return names.join(separator);
  }
});
