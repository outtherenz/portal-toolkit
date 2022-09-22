import { sort } from '@ember/object/computed';
import Component from '@ember/component';
import $ from 'jquery';
import { set, get, computed } from '@ember/object';
import layout from '../templates/components/sortable-list';

export default Component.extend({
  layout,
  tagName: 'ol',
  classNames: [ 'sortable-list' ],

  content: null,
  property: 'value',

  index: 'sortIndex',
  sortBy: computed('index', function() {
    return [ this.index ];
  }),

  sortedContent: sort('content', 'sortBy'),

  sort() {
    this.$('li').each((index, li) => {
      const id = $(li).attr('data-id');
      const item = this.content.find((i)=>i.id == id);

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
