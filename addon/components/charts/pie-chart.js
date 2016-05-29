import Ember from 'ember';
import C3Chart from 'ember-c3/components/c3-chart';

const { computed, Logger, get } = Ember;

export default C3Chart.extend({
  classNames: ['dashboard-module', 'pie-chart'],

  data: computed('metrics', function() {
    const metrics = this.get('metrics');
    const periodType = this.get('period.type');
    const columns = [];

    if (!metrics || !metrics.length) {
      Logger.warn('No data provided to pie chart component.');
      return;
    }

    metrics.forEach(metric => {
      let value = null;

      value = get(metric, `series.0.periods.0.periodTypes.${periodType}.value`);

      columns.push([
        metric.meta.name,
        !isNaN(value) ? value : null
      ]);
    });

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
