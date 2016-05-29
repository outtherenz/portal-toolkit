import Ember from 'ember';
import layout from '../templates/components/sortable-list';

const { Component, computed, $ } = Ember;

export default Component.extend({
  layout,
  tagName: 'ol',
  classNames: [ 'sortable-list' ],

  index: 'sortIndex',
  sortBy: computed('index', function() {
    return [ this.get('index') ];
  }),

  sortedContent: computed.sort('content', 'sortBy'),

  sort() {
    this.$('li').each((index, li) => {
      const id = $(li).attr('data-id');
      const item = this.get('content').findBy('id', id);

      if (item) {
        item.set('sortIndex', index);
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
