import { isEmpty } from '@ember/utils';
import { get, computed } from '@ember/object';
import { warn } from '@ember/debug';
import C3Chart from 'ember-c3/components/c3-chart';

export default C3Chart.extend({
  classNames: [ 'chart', 'chart--pie' ],

  markEmptySeries: true,
  markNegativeSeries: true,

  data: computed('metrics', 'period', function() {
    const metrics = this.metrics;
    const periodType = get(this, 'period.type');
    const markEmpty = this.markEmptySeries;
    const markNegative = this.markNegativeSeries;
    const columns = [];

    if (!metrics || isEmpty(metrics)) {
      warn('No data provided to pie chart component.');
      return;
    }

    metrics.forEach(metric => {
      let name = get(metric, 'meta.name');
      const value = get(metric, `series.0.periods.0.periodTypes.${periodType}.value`) || 0;

      if (markEmpty && !value) {
        name += ' (no data)';
      }

      if (markNegative && value != null && value < 0) {
        name += ' (negative)';
      }

      columns.push([ name, value ]);
    });

    // Sort by value
    columns.sort((a, b) => b[1] - a[1]);

    return {
      type: 'pie',
      columns
    };
  }),

  size: {
    height: 220
  },

  legend: { position: 'right' }
});
