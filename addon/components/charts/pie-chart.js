import Ember from 'ember';
import C3Chart from 'ember-c3/components/c3-chart';

const { computed, isEmpty, Logger: { warn }, get } = Ember;

export default C3Chart.extend({
  classNames: ['dashboard-module', 'pie-chart'],

  markEmptySeries: true,
  markNegativeSeries: true,

  data: computed('metrics', function() {
    const metrics = get(this, 'metrics');
    const periodType = get(this, 'period.type');
    const markEmpty = get(this, 'markEmptySeries');
    const markNegative = get(this, 'markNegativeSeries');
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
