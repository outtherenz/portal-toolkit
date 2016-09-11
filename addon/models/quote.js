import DS from 'ember-data';
import Ember from 'ember';

const {
  Model,
  attr,
  belongsTo,
  hasMany
} = DS;

const {
  computed,
  get
} = Ember;

const {
  alias
} = computed;

export default Model.extend({
  quoter: belongsTo('user'),
  quoteNumber: attr('number'),
  number: alias('quoteNumber'),
  date: attr('date'),
  entity: belongsTo('entity'),

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
    const status = get(this, 'status');
    const validStatuses = [
      'pending',
      'accepted',
      'redundant',
      'rejected'
    ];

    return validStatuses.contains(status) ? status.capitalize() : 'Invalid Status';
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
    return (get(this, 'servicePrice') - get(this, 'setupPrice'));
  }),

  // Profit after discount is subtracted
  netProfit: computed('servicePriceWithDiscount', 'setupPrice', function() {
    return (get(this, 'servicePriceWithDiscount') - get(this, 'setupPrice'));
  }),

  // Amount discounted as a percentage
  discountPercentage: computed('servicePrice', 'servicePriceWithDiscount', function() {
    return (get(this, 'servicePrice') - get(this, 'servicePriceWithDiscount')) / get(this, 'servicePrice');
  }),

  // Return on investment as percentage
  roi: computed('servicePriceWithDiscount', 'setupPrice', function() {
    return (get(this, 'servicePriceWithDiscount') - get(this, 'setupPrice')) / get(this, 'servicePriceWithDiscount');
  })
});
