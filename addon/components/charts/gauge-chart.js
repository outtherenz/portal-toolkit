import Ember from 'ember';
import C3Chart from 'ember-c3/components/c3-chart';
import { formatNumber } from 'portal-toolkit/helpers/format-number';
import moment from 'moment';

const { computed, isEmpty, isArray, Logger: { warn }, get } = Ember;

export default C3Chart.extend({
  classNames: ['dashboard-module', 'gauge-chart'],

  markEmptySeries: true,
  markNegativeSeries: true,

  data: computed('metrics', 'period', function() {
    const metrics = get(this, 'metrics');
    const periodType = get(this, 'period.type');
    const columns = [];
    const seriesMeta = get(this, 'series');
    const series = isArray(metrics) ? metrics[0].series : metrics.series;



    if (!metrics || isEmpty(metrics)) {
      warn('No data provided to gauge chart component.');
      return;
    }
    let name = get(metrics[0], 'meta.name');
    const value = get(metrics[0], `series.0.periods.0.periodTypes.${periodType}.value`) || 0;

    columns.push([ name, value ]);

    return {
      type: 'gauge',
      columns
    };
  }),

  size: {
    height: 220
  },
  target: 100,
  gauge: {
    label: {
        format: function(value, ratio) {
            return value;
        },
        show: true // to turn off the min/max labels.
    },
    min: 50, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
    max: 150, // 100 is default
    units: ' %',
    width: 36 // for adjusting arc thickness
  },
  color: {
    pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
    threshold: {
      unit: 'value', // percentage is default
      max: 150, // 100 is default
      values: [70, 90, 110, 130]
    }
  },
  legend: { position: 'right' }
});
