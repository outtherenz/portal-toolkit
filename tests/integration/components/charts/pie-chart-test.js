import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('charts/pie-chart', 'Integration: ChartsPieChartComponent', { integration: true }, function() {
  it.only('renders', function() {
    const metrics = [{
      metric: '5760a0026a2fdd76101ea43c',
      series: [{branch: '5760902c6a2fdd76101ea429',
        periods: [
          {account: '5760a0026a2fdd76101ea43c',
          branch: '5760902c6a2fdd76101ea429',
          date: '2015-06-30T11:59:59.999Z',
          import: '57688753bd59bec40b726b0f',
          organisation: '576090186a2fdd76101ea426',
          periodTypes: {
            month: {
              mapsUsed: [],
              value: 55
            },
            ytd: {
              mapsUsed: [],
              value: 100
            }
          }
          }
        ]
      }]
    }];
    const period = {start: '2015-06', end: '2015-06', type: 'month'};

    this.set('metrics', metrics);
    this.set('period', period);

    this.render(hbs`{{component charts/pie-chart thisData=data metrics=metrics period=period}}
`);
    expect(this.$('.c3')).to.have.lengthOf(1);
  });
});
