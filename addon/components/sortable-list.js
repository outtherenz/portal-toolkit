import Ember from 'ember';
import layout from '../templates/components/sortable-list';

const { Component, computed, $, get, set } = Ember;

export default Component.extend({
  layout,
  tagName: 'ol',
  classNames: [ 'sortable-list' ],

  index: 'sortIndex',
  sortBy: computed('index', function() {
    return [ get(this, 'index') ];
  }),

  sortedContent: computed.sort('content', 'sortBy'),

  sort() {
    this.$('li').each((index, li) => {
      const id = $(li).attr('data-id');
      const item = get(this, 'content').findBy('id', id);

      if (item) {
        set(item, 'sortIndex', index);
      }
    });
  },

  didInsertElement() {
    $(this.$()).nativeSortable({
      animation: 250,
      onSort: () => this.sort()
    });
  }
});
