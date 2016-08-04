import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import { beforeEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../helpers/setup-mirage-for-integration';
import { formatNumber } from 'portal-toolkit/helpers/format-number';
import fakeReporter from '../../../mirage/fake-reporter';
/* global server */

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
      start: '2015-04',
      end: '2016-03',
      type: 'month'
    };

    this.set('metrics', metrics);
    this.set('series', series);
    this.set('period', period);
  });

  it('renders data-table component', function() {
    this.render(hbs`{{charts/data-table series=series metrics=metrics period=period}}`);
    expect(this.$('table tr td')[0].firstChild.data).to.equal('Sales');
  });
  it('fills in data-table properly', function() {
    this.render(hbs`{{charts/data-table series=series metrics=metrics period=period}}`);
    expect(this.$('table tr td')[0].firstChild.data).to.equal('Sales');
    const metrics = this.get('metrics');
    const shouldBe = formatNumber(['currency', metrics[0].series[0].periods[0].periodTypes['month'].value]);
    expect(this.$('td.text-right').text()).to.equal(shouldBe);
  });

  it('renders line-chart component', function() {
    this.render(hbs`{{charts/line-chart series=series metrics=metrics period=period}}`);
    expect(this.$('.c3-event-rect-11')).to.have.lengthOf(1);
    expect(this.$('.c3-event-rect-13')).to.not.have.lengthOf(1);
  });
  it('fills in line-chart data properly', function() {
    const metrics = this.get('metrics');
    for (var i = 0; i < 3; i++) {
      metrics[0].series[0].periods[i].periodTypes['month'].value = i;
    }
    this.set('metrics', metrics);
    this.render(hbs`{{charts/line-chart series=series metrics=metrics period=period}}`);
    const portion1 = this.$('.c3-shape-1')[0].cy.animVal.value;
    const portion2 = this.$('.c3-shape-2')[0].cy.animVal.value;
    const portion3 = this.$('.c3-shape-3')[0].cy.animVal.value;
    expect(portion1).to.be.above(portion2);
    expect(portion2).to.be.above(portion3);
  });

  it('renders pie-chart component', function() {
    this.render(hbs`{{charts/pie-chart series=series metrics=metrics period=period}}`);
    expect(this.$('.c3-arc-Sales')).to.have.lengthOf(1);
  });
  it('fills in pie-chart data properly', function() {
    this.render(hbs`{{charts/pie-chart series=series metrics=metrics period=period}}`);
    const metrics = this.get('metrics');
    const temp = metrics[0].series[0].periods[0].periodTypes['month'].value;
    expect(this.$('.c3-arc-Sales')[0].__data__.value).to.equal(temp);
  });
  it('renders gauge-chart component', function() {
    this.render(hbs`{{charts/gauge-chart series=series metrics=metrics period=period}}`);
    expect(this.$('.c3-arc-Sales')).to.have.lengthOf(1);
  });
  it('fills in gauge-chart data properly', function() {
    this.render(hbs`{{charts/gauge-chart series=series target=80 metrics=metrics period=period}}`);
    const metrics = this.get('metrics');
    const temp = metrics[0].series[0].periods[0].periodTypes['month'].value;
    expect(this.$('.c3-arc-Sales')[0].__data__.value).to.equal(temp / 80);
  });
});
