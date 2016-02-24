import Ember from 'ember';
import layout from '../templates/components/active-table';

const { computed, Object } = Ember;

export default Ember.Component.extend({
  layout,

  tagName: 'table',
  classNames: [ 'active-table' ],
  classNameBindings: [ 'sortable' ],

  data: [],
  columns: [],
  sortable: true,

  headers: computed('columns', function() {
    const [ sortedBy, sortDir ] = this.get('sortedBy.0').split(':');
    const columns = this.get('columns');
    const columnCount = columns.get('length');
    const headers = [];
    let totalUnits = 0;
    let flexibleProportion = 1;

    columns.forEach(column => {
      if (column.width) {
        totalUnits += column.width;
      } else {
        flexibleProportion -= 1 / columnCount;
      }
    });

    columns.forEach(column => {
      const header = Object.create({
        name: column.name,
        key: column.key
      });

      if (column.width && typeof column.width === 'number') {
        header.set('width', column.width / totalUnits * flexibleProportion * 100 + '%');
      } else if (column.width && typeof column.width === 'string') {
        header.set('width', column.width);
      } else {
        header.set('width', 1 / columnCount * 100 + '%');
      }

      // If the content is sorted by this column
      if (sortedBy === header.get('key')) {
        header.set('sorted', true);
        header.set('ascending', sortDir !== 'desc');
      }

      headers.push(header);
    });

    return headers;
  }),

  actions: {
    sortBy: function(columnToSort) {
      const toSortBy = columnToSort.get('key');
      const [ sortedBy, sortDir ] = this.get('sortedBy.0').split(':');

      if (sortedBy === toSortBy) {
        // set sort order
        const newDir = sortDir !== 'desc' ? 'desc' : 'asc';
        this.set('sortedBy', [ sortedBy + ':' + newDir ]);

        // nofity column
        columnToSort.set('sorted', true);
        columnToSort.set('ascending', newDir === 'asc');
      } else {
        // set sort order
        this.set('sortedBy', [ toSortBy + ':asc' ]);

        // set column meta
        this.get('headers').forEach(column => column.set('sorted', false));
        columnToSort.set('sorted', true);
        columnToSort.set('ascending', true);
      }
    }
  }
});
