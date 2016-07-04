import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent('charts/pie-chart', 'Integration: ChartsPieChartComponent', { integration: true }, function() {
  it.only('renders', function() {
    let metrics = '5760a5836a2fdd76101ea441';
    let series;
    let period;

    this.set('metrics', metrics);
    this.set('series', series);
    this.set('period', period);

    this.render(hbs`{{component charts/pie-chart metrics=metrics series=series period=period}}`);
    expect(this.$('.c3-charts-arcs')).to.have.lengthOf(1);
  });
});
