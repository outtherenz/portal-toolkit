import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';
export default Factory.extend({
  code: null,
  periodic: true,
  format: 'CURRENCY',
  debitCredit: 'CREDIT',
  category: 'profit-and-loss',
  label: null,
  status: 'ACTIVE',
  isHeading: false,
  sortIndex: i => i,
  dateCreated: faker.date.past,
  dateModified: function() { return faker.date.between(this.dateCreated, new Date()); }
});
