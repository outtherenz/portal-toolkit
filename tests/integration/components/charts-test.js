import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import {beforeEach} from 'mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('charts', 'Integration: ChartsComponent', { integration: true }, function() {
  beforeEach(function specialstuff() {
    const metrics = [
      {
        metric: '5760a5836a2fdd76101ea441',
        meta: {
          name: 'egg'
        },
        series: [
          {
            branch: '576090256a2fdd76101ea427',
            periods: [
              {
                account: '57609fb96a2fdd76101ea436',
                branch: '576090256a2fdd76101ea427',
                date: '2016-03-31T10:59:59.999Z',
                import: '57677b3fbd59bec40b6ad751',
                organisation: '576090186a2fdd76101ea426',
                periodTypes: {
                  month: {
                    mapsUsed: [],
                    value: 60
                  },
                  ytd: {
                    mapsUsed: [],
                    value: 80
                  }
                }
              }
            ]
          }]
      },
      {
        metric: '5760be476a2fdd76101ea48b',
        meta: {
          name: 'bacon'
        },
        series: [
          {
            branch: '5760902c6a2fdd76101ea429',
            periods: [
              {
                account: '5760be476a2fdd76101ea48b',
                branch: '5760902c6a2fdd76101ea429',
                date: '2016-03-31T10:59:59.999Z',
                import: '57688b8dbd59bec40b74f132',
                organisation: '576090186a2fdd76101ea426',
                periodTypes: {
                  month: {
                    mapsUsed: [],
                    value: 40
                  },
                  ytd: {
                    mapsUsed: [],
                    value: 20
                  }
                }
              }
            ]
          }
        ]
      },
      {
        metric: '5760be476a2fdd76101ea48a',
        meta: {
          name: 'steak'
        },
        series: [
          {
            branch: '5760902c6a2fdd76101ea429',
            periods: [
              {
                account: '5760be476a2fdd76101ea48b',
                branch: '5760902c6a2fdd76101ea429',
                date: '2016-03-31T10:59:59.999Z',
                import: '57688b8dbd59bec40b74f132',
                organisation: '576090186a2fdd76101ea426',
                periodTypes: {
                  month: {
                    mapsUsed: [],
                    value: 5
                  },
                  ytd: {
                    mapsUsed: [],
                    value: 20
                  }
                }
              }
            ]
          }
        ]
      }
    ];
    const period = {start: '2016-03', end: '2016-03', type: 'month'};
    this.set('metrics', metrics);
    this.set('period', period);
    this.set('series', ['1']);

  });

  it('renders test page', function() {
    this.render(hbs`{{charts}}`);
    expect(this.$()).to.have.lengthOf(1);
  });

  it('renders data-table component', function() {
    this.render(hbs`{{charts/data-table series=series thisData=data metrics=metrics period=period}}`);
    expect(this.$('.data-table')).to.have.lengthOf(1);
  });

  it('renders line-chart component', function() {
    this.render(hbs`{{charts/line-chart series=series thisData=data metrics=metrics period=period}}`);
    expect(this.$('.line-chart')).to.have.lengthOf(1);
  });

  it('renders pie-chart component', function() {
    this.render(hbs`{{charts/pie-chart series=series thisData=data metrics=metrics period=period}}`);
    expect(this.$('.c3-arc-egg')).to.have.lengthOf(1);
  });
});
