import { get, computed } from '@ember/object';
import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend({
  name: attr('string'),
  category: attr('string'),
  quantity: attr('number'),
  recurrence: attr('number'),

  setupPrice: attr('number'),
  servicePrice: attr('number'),
  setupCost: attr('number'),
  serviceCost: attr('number'),

  shortDescription: attr('string'),
  longDescription: attr('string'),

  itemTemplate: belongsTo('product'),
  entity: belongsTo('entity'),

  finalCost: computed('setupCost', 'serviceCost', 'recurrence', 'quantity', function() {
    return this.quantity * (this.setupCost + (this.serviceCost * this.recurrence));
  }),

  finalPrice: computed('setupPrice', 'servicePrice', 'recurrence', 'quantity', function() {
    return this.quantity * (this.setupPrice + (this.servicePrice * this.recurrence));
  }),

  itemProfit: computed('finalPrice', 'finalCost', function() {
    return this.finalPrice - this.finalCost;
  })
});
