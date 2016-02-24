import Ember from 'ember';
import { formatNumber } from 'portal/helpers/fmt-number';
import { formatCurrency } from 'portal/helpers/fmt-currency';
import { formatPercentage } from 'portal/helpers/fmt-percentage';
/* global moment */

const { get } = Ember;

export default Ember.Component.extend({
  classNames: ['dashboard-module', 'data-table'],

  tagName: 'table',

  data: Ember.computed('metrics', function() {
    const metrics = this.get('metrics');
    const date = moment(this.get('period.start'), 'YYYY-MM').endOf('month').toDate();
    const periodType = this.get('period.type');
    const table = [];

    metrics.forEach(metric => {
      const format = get(metric, 'meta.format');
      const series = get(metric, 'series') || [];
      const periods = get(series.objectAt(0) || [], 'periods') || [];
      const period = periods.find(p => p.date === date.toISOString());
      let value = period ? get(period, `periodTypes.${periodType}.value`) : null;

      if (value != null) {
        switch (format) {
          case 'INTEGER':
            value = formatNumber(value, { places: 0 });
            break;
          case 'NUMBER':
            value = formatNumber(value, { places: 2 });
            break;
          case 'CURRENCY':
            value = formatCurrency(value, { places: 2 });
            break;
          case 'PERCENTAGE':
            value = formatPercentage(value, { places: 2 });
            break;
          default:
            value = formatNumber(value, { places: 2 });
            break;
        }
      } else if (typeof value === 'undefined') {
        value = null; // null not undefined
      }

      table.push([ get(metric, 'meta.name'), value ]);
    });

    return table;
  })
});
