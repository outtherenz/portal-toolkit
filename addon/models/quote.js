import { get, computed } from '@ember/object';
import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo,
  hasMany
} = DS;

export default Model.extend({
  quoter: belongsTo('user'),
  quoteNumber: attr('number'),
  date: attr('date'),

  // Content
  items: hasMany('quote-item'),
  comments: attr('string'),
  pCDescription: attr('string'),

  // Recipient
  email: attr('string'),
  company: attr('string'),
  phoneNumber: attr('string'),

  // Quote Status Enum(pending, redundant, accepted, rejected)
  status: attr('string'),

  showItemQuantity: attr('boolean'),
  showItemDiscount: attr('boolean'),
  showItemPrices: attr('boolean'),

  dateCreated: attr('date'),
  dateModified: attr('date'),

  // Statuses get capitalized and sometimes changed entirely
  displayedStatus: computed('status', function() {
    const status = this.status;
    const validStatuses = [
      'pending',
      'accepted',
      'redundant',
      'rejected'
    ];

    return validStatuses.includes(status) ? status.capitalize() : 'Invalid Status';
  }),

  /* Money matters */
  // Service price is price charged to the customer for the whole quote
  servicePrice: attr('number'),

  // Total discount on quote
  serviceAmountDiscounted: attr('number'),

  // Total price after discount
  servicePriceWithDiscount: attr('number'),

  // GST on total price after discount
  serviceTotalGst: attr('number'),

  // Total price after discount and GST
  servicePriceWithGst: attr('number'),

  // Setup price is cost paid by the contractor for the whole quote
  setupPrice: attr('number'),

  // GST on setup price (all discount has been applied to service cost)
  setupTotalGst: attr('number'),

  // Setup price with GST, this and serviceTotalGst make up the total charged to customer
  setupPriceWithGst: attr('number'),

  /* Calculations */
  // Profit before discount is subtracted
  rawProfit: computed('servicePrice', 'setupPrice', function() {
    return this.servicePrice - this.setupPrice;
  }),

  // Profit after discount is subtracted
  netProfit: computed('servicePriceWithDiscount', 'setupPrice', function() {
    return this.servicePriceWithDiscount - this.setupPrice;
  }),

  // Amount discounted as a percentage
  discountPercentage: computed('servicePrice', 'servicePriceWithDiscount', function() {
    return (this.servicePrice - this.servicePriceWithDiscount) / this.servicePrice;
  }),

  // Return on investment as percentage
  roi: computed('servicePriceWithDiscount', 'setupPrice', function() {
    return (this.servicePriceWithDiscount - this.setupPrice) / this.servicePriceWithDiscount;
  })
});
