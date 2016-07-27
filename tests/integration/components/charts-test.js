import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import { beforeEach, afterEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../helpers/setup-mirage-for-integration';
import Ember from 'ember';
import fakeReporter from '../../../mirage/fake-reporter';

describeComponent('charts', 'Integration: ChartsComponent', { integration: true, setup: () => startMirage(this.container) }, function() {
  beforeEach(function() {
    const metrics = fakeReporter('balances')(server.schema, {
      queryParams: {
        branches: [ '1' ],
        accounts: [ '1' ],
        periodStart: '2015-04',
        periodEnd: '2016-03'
      }
    }).data;

    const series = [ server.schema.branches.find(1) ];

    const period = {
      start: '2015-03',
      end: '2016-03',
      type: 'month'
    };

    this.set('metrics', metrics);
    this.set('series', series);
    this.set('period', period);
  });

  afterEach(function() {
    window.server.shutdown();
  });

  it('renders data-table component', function() {
    this.render(hbs`{{charts/data-table series=series thisData=data metrics=metrics period=period}}`);
    expect(this.$('table tr td').text()).to.equal('Sales');
    expect(this.$('table tr td').next().text()).to.equal('');
  });

  it('renders line-chart component', function() {
    this.render(hbs`{{charts/line-chart series=series thisData=data metrics=metrics period=period}}`);
    expect(this.$('.c3-event-rect-11')).to.have.lengthOf(1);
    expect(this.$('.c3-event-rect-13')).to.not.have.lengthOf(1);
  });

  it('renders pie-chart component', function() {
    this.render(hbs`{{charts/pie-chart series=series thisData=data metrics=metrics period=period}}`);
    expect(this.$('.c3-arc-Sales')).to.have.lengthOf(1);
  });
});
