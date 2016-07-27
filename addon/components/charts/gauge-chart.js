import Ember from 'ember';
import C3Chart from 'ember-c3/components/c3-chart';
import { formatNumber } from 'portal-toolkit/helpers/format-number';

const {
  computed,
  isEmpty,
  warn,
  get,
} = Ember;

export default C3Chart.extend({
  classNames: ['dashboard-module', 'gauge-chart'],

  reverseColors: false,
  min: 0,
  max: 1,
  label: '% of target',

  data: computed('metrics', 'period', 'target', function() {
    const metrics = get(this, 'metrics');
    const target = get(this, 'target');
    const periodType = get(this, 'period.type');
    const columns = [];

    if (!metrics || isEmpty(metrics)) {
      warn('No data provided to gauge chart component.');
      return;
    }

    const name = get(metrics[0], 'meta.name');
    const min = get(this, 'min');
    const max = get(this, 'max');

    const metric = get(metrics[0], `series.0.periods.0.periodTypes.${periodType}.value`) || 0;
    const value = metric / target;

    columns.push([ name, value ]);

    return {
      type: 'gauge',
      columns
    };
  }),

  size: {
    height: 180
  },
  gauge: computed('min', 'max', 'units', function() {
    return {
      label: {
        format: (value, ratio) => formatNumber([ 'percentage', value ], { places: 2, dashZero: false }),
        show: true // to turn off the min/max labels
      },
      min: get(this, 'min'),
      max: get(this, 'max'), // 100 is default
      units: get(this, 'label'),
      width: 60 // for adjusting arc thickness
    }
  }),

  color: computed('min', 'max', function() {
    const min = get(this, 'min');
    const max = get(this, 'max');
    const reverseColors = get(this, 'reverseColors');
    const values = [];

    let colors = [
      '#ca1528',
      '#d02329',
      '#db382b',
      '#e6502e',
      '#ef6931',
      '#f08033',
      '#f09136',
      '#d0973c',
      '#b0973e',
      '#8c9341',
      '#688c44',
      '#498646'
    ];

    if (reverseColors) {
      colors = colors.reverse();
    }

    for (let i = 0; i < colors.length; i++) {
      values.push(min + i / colors.length * (max - min));
    }

    return {
      pattern: colors,
      threshold: {
        unit: 'value', // percentage is default
        max: get(this, 'max'), // 100 is default
        values
      }
    }
  }),

  legend: { position: 'right' }
});
