import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  introLine: () => faker.lorem.sentence(),
  description: () => faker.lorem.paragraph(),
  strategies: () => faker.lorem.paragraph(),
  sortIndex: i => i,
  format: 'PERCENTAGE'
});
