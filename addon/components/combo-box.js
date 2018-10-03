import Component from '@ember/component';
import { set, get, computed } from '@ember/object';
import $ from 'jquery';
import layout from '../templates/components/combo-box';
import { next } from '@ember/runloop';

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
  },

  // Things that need to happen once, when the element is destroyed
  willDestroyElement() {
    // remove our listener
    $(window).off('click');
  },

  // Things that need to happen every time the element is re-rendered
  willRender() {
    // We only want to set the value when the search is not being used and the value has changed
    const finderNotVisible = !get(this, 'finderVisible');
    const activeValue = get(this, 'activeDisplayName');
    const searchTerm = get(this, 'searchTerm');
    if (finderNotVisible && activeValue !== searchTerm) {
      set(this, 'searchTerm', activeValue);
    }
  },

  filteredOptions: computed('key', 'options', 'searchTerm', function() {
    const key = get(this, 'key');
    const searchTerm = get(this, 'searchTerm');
    const options = get(this, 'options');

    if (searchTerm) {
      return options.filter(option => {
        const searchableValue = typeof option === 'object' ? get(option, key) : option;
        return tlc(searchableValue).includes(tlc(searchTerm));
      });
    } else {
      return options;
    }
  }),

  activeDisplayName: computed('value', 'options', function() {
    const value = get(this, 'value');
    const key = get(this, 'key');

    if (typeof value !== 'object') {
      // Verbatim if value is not an object
      return value;
    } else if (key && value) {
      // value[key] if both key and value are truthy
      return get(value, key);
    } else {
      // Empty string if nothing else matches
      return '';
    }
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
          this.send('setItem');
          this.send('setFinderVisible', false);
          break;
        // escape
        case 27:
          this.send('setFinderVisible', false);
          break;
        // any other key
        default:
          set(this, 'selectedRow', -1);
          this.send('setItem', -1);
          this.send('setFinderVisible', true);
          break;
      }
    },

    unSetHighlight(index) {
      if (get(this, 'selectedRow') === index) set(this, 'selectedRow', null);
    },

    setItem(index) {
      next(() => {
        // when the index is negative, the new item value is in the searchTerm
        const item = index >= 0 ? get(this, 'filteredOptions').objectAt(index) : get(this, 'searchTerm');
        const key = get(this, 'key');

        if (typeof item === 'object') {
          this.sendAction('onSet', key ? get(item, key) : item);
        } else {
          this.sendAction('onSet', item);
        }
        if (index >= 0) this.send('setFinderVisible', false);
      });
    }
  }
});
