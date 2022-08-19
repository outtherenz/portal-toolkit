import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  name: i => `Branch ${i}`,
  system:  faker.helpers.arrayElement([
  'rees', 'myob', 'myob-ao', 'prostix', 'eaccounts']),
  dateCreated: faker.date.past,
  dateModified: function() { return faker.date.between(this.dateCreated, new Date()); }
});
