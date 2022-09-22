import { get, computed } from '@ember/object';
import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend({
  name: attr('string'),
  code: attr('string'),
  category: attr('string'),

  //  Price is to the customer, cost is to the contractor
  //  Setup is the price/cost to set up one quantity
  //  Service is the price/cost for one reccurence
  setupPrice: attr('number'),
  servicePrice: attr('number'),
  setupCost: attr('number'),
  serviceCost: attr('number'),

  // Customer-facing
  shortDescription: attr('string'),
  // Contractor-facing
  longDescription: attr('string'),

  // Legacy support
  description: attr('string'),

  stock: attr('number'),
  currency: attr('string'),

  entity: belongsTo('entity'),

  // Enum(active, inactive) items that are 'deleted' are set to inactive
  status: attr('string', { defaultValue: 'active' }),

  // Amount of profit made per item setup
  pPI: computed('setupPrice', 'setupCost', function() {
    return this.setupPrice -  this.setupCost;
  }),

  // Amount of profit made per reccurence
  pPR: computed('servicePrice', 'serviceCost', function() {
    return this.servicePrice - this.serviceCost;
  }),

  // Minimum number of returns before a profit is made
  mRQ: computed('pPI', 'pPR', function() {
    const profitPerItem = this.pPI;
    const profitPerRecurrence = this.pPR;

    if (profitPerItem < 0 && profitPerRecurrence <= 0) {
      return '∞';
    }

    if (profitPerItem >= 0) {
      return 0;
    }

    const recurrencesNeeded = Math.ceil(-profitPerItem / profitPerRecurrence);

    if (recurrencesNeeded > 100) {
      return '100+';
    }

    return recurrencesNeeded;
  })
});
