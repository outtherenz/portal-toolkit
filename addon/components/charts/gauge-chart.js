import Ember from 'ember';
import C3Chart from 'ember-c3/components/c3-chart';
import { formatNumber } from 'portal-toolkit/helpers/format-number';

const { computed, isEmpty, Logger: { warn }, get } = Ember;

export default C3Chart.extend({
  classNames: ['dashboard-module', 'gauge-chart'],

  data: computed('metrics', 'period', 'target', function() {
    const metrics = get(this, 'metrics');
    const target = get(this, 'target');
    const periodType = get(this, 'period.type');
    const columns = [];

    if (!metrics || isEmpty(metrics)) {
      warn('No data provided to gauge chart component.');
      return;
    }
    let name = get(metrics[0], 'meta.name');

    const metric = get(metrics[0], `series.0.periods.0.periodTypes.${periodType}.value`) || 0;
    const value = formatNumber(metric/target*100, { places: 2, dashZero: false });
    columns.push([ name, value ]);

    return {
      type: 'gauge',
      columns
    };
  }),

  size: {
    height: 220
  },
  gauge: {
    label: {
      format: function(value, ratio) {
        return value;
      },
      show: true // to turn off the min/max labels.
    },
    min: 30,
    max: 180, // 100 is default
    units: '% of Target',
    width: 80 // for adjusting arc thickness
  },
  color: {
    pattern: ['#FF0000', '#d7390e', '#f66000', '#f6ab19', '#def619', '#bcf619', '#66f619', '#42b406', '#66f619', '#bcf619', '#def619', '#f6ab19', '#f66000', '#d7390e', '#FF0000'],
    threshold: {
      unit: 'value', // percentage is default
      max: 180, // 100 is default
      values: [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 150, 160, 170, 180]
    }
  },
  legend: { position: 'right' }
});
