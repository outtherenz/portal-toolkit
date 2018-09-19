import Component from '@ember/component';
import { set, get, computed } from '@ember/object';
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
        this.send('setItem');
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

  filteredOptions: computed('key', 'options', 'searchTerm', function() {
    const key = get(this, 'key');
    const searchTerm = get(this, 'searchTerm');
    const options = get(this, 'options');

    if (searchTerm) {
      return options.filter(option =>
        tlc(this.isObject(option) ? get(option, key) : option).indexOf(tlc(searchTerm)) !== -1
      );
    }
    return options;
  }),

  activeDisplayName: computed('value', 'options', function() {
    const value = get(this, 'value');

    if (!value) return '';
    if (!this.isObject(value)) return value;

    const key = get(this, 'key');

    // find the currently selected value from the options
    const selected = get(this, 'options').find(option =>
      tlc(this.isObject(option) ? get(option, key) : option) === tlc(this.isObject(value) ? get(value, key) : value)
    );

    if (!selected) return '';

    return get(selected, key);
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
      const optionKey = get(this, 'optionKey');

      if (this.isObject(item)) {
        this.sendAction('onSet', optionKey ? get(item, optionKey) : item);
      } else {
        this.sendAction('onSet', item);
      }

      this.send('setFinderVisible', false);
    }
  },
  isObject(value) {
    return typeof value === 'object';
  }
});
