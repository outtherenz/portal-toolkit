import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import $ from 'jquery';

export default Route.extend({
  model() {
    const kpisPayload = {
      organisation: '1',
      periodStart: '2015-04',
      periodEnd: '2016-03',
      branches: [ '1', '2' ]
    };

    return RSVP.hash({
      kpis: $.getJSON('/reports/kpis', kpisPayload).then(d => d.data),
      series: this.store.findAll('branch').then(b => b.slice(0, 2))
    });
  }
});
