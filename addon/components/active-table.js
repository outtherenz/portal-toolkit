import Ember from 'ember';
import layout from '../templates/components/active-table';

const {
  Component,
  computed,
  Object: EObject,
  get,
  set
} = Ember;

export default Component.extend({
  layout,

  tagName: 'table',
  classNames: [ 'active-table' ],
  classNameBindings: [ 'sortable' ],

  data: [],
  columns: [],
  sortable: true,

  headers: computed('columns', function() {
    const [ sortedBy, sortDir ] = get(this, 'sortedBy.0').split(':');
    const columns = get(this, 'columns');
    const columnCount = get(columns, 'length');
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
      const header = EObject.create({
        name: column.name,
        key: column.key
      });

      if (column.width && typeof column.width === 'number') {
        set(header, 'width', column.width / totalUnits * flexibleProportion * 100 + '%');
      } else if (column.width && typeof column.width === 'string') {
        set(header, 'width', column.width);
      } else {
        set(header, 'width', 1 / columnCount * 100 + '%');
      }

      // If the content is sorted by this column
      if (sortedBy === get(header, 'key')) {
        set(header, 'sorted', true);
        set(header, 'ascending', sortDir !== 'desc');
      }

      headers.push(header);
    });

    return headers;
  }),

  actions: {
    sortBy: function(columnToSort) {
      const toSortBy = get(columnToSort, 'key');
      const [ sortedBy, sortDir ] = get(this, 'sortedBy.0').split(':');

      if (sortedBy === toSortBy) {
        // set sort order
        const newDir = sortDir === 'desc' ? 'asc' : 'desc';
        set(this, 'sortedBy', [ sortedBy + ':' + newDir ]);

        // nofity column
        set(columnToSort, 'sorted', true);
        set(columnToSort, 'ascending', newDir === 'asc');
      } else {
        // set sort order
        set(this, 'sortedBy', [ toSortBy + ':asc' ]);

        // set column meta
        get(this, 'headers').forEach(column => set(column, 'sorted', false));
        set(columnToSort, 'sorted', true);
        set(columnToSort, 'ascending', true);
      }
    }
  }
});
