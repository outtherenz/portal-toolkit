import { Factory, faker } from 'ember-cli-mirage';

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
  dateCreated: () => faker.date.past(),
  dateModified: () => faker.date.between(this.dateCreated, new Date())
});
