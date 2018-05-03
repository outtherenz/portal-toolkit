import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import $ from 'jquery';
import layout from '../templates/components/input-auto-complete';

export default Component.extend({
  layout,
  value: '',
  open: false,
  availableTags: [],

  matched: computed('value.length', 'open', function() {
    if (get(this, 'open')) {
      const value = get(this, 'value');
      const searchString = new RegExp(value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'), 'ig');
      const tags = get(this, 'availableTags').filter(tag => tag.match(searchString));

      if (!get(value, 'length')) return [];

      return tags;
    }
  }),

  didInsertElement() {
    // close the popup when the page is clicked
    $(document).click(() => {
      set(this, 'open', false);
    });

    // open the popup when the input is typed into
    $('#input-auto-complete__wrapper').keyup(event => {
      set(this, 'open', true);
    });
  },

  actions: {
    setItem(item) {
      set(this, 'value', item);
    }
  }
});
