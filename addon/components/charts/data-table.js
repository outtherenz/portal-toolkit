import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { formatNumber } from 'portal-toolkit/helpers/format-number';
import layout from '../../templates/components/charts/data-table';
import moment from 'moment';

export default Component.extend({
  layout,

  classNames: [ 'chart', 'chart--data-table', 'data-table' ],
  tagName: 'table',

  data: computed('metrics', 'period', function() {
    const metrics = this.metrics;
    const date = moment(get(this, 'period.start'), 'YYYY-MM').endOf('month').toDate();
    const periodType = get(this, 'period.type');
    const table = [];

    metrics.forEach(metric => {
      const format = get(metric, 'meta.format');
      const series = get(metric, 'series') || [];
      const periods = get(series.objectAt(0) || [], 'periods') || [];
      const period = periods.find(p => p.date === date.toISOString());
      let value = period ? get(period, `periodTypes.${periodType}.value`) : null;

      if (value != null) {
        value = formatNumber([ format, value ]);
      } else if (typeof value === 'undefined') {
        value = null; // null not undefined
      }

      table.push([ get(metric, 'meta.name'), value ]);
    });

    return table;
  })
});
