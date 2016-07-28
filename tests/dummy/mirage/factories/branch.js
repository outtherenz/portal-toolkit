import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: i => `Branch ${i}`,
  system: faker.list.cycle('rees', 'myob', 'myob-ao', 'prostix', 'eaccounts'),
  dateCreated: () => faker.date.past(),
  dateModified: () => faker.date.between(this.dateCreated, new Date())
});
