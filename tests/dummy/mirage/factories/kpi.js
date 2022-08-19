import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';
export default Factory.extend({
  introLine: () => faker.lorem.sentence(),
  description: () => faker.lorem.paragraph(),
  strategies: () => faker.lorem.paragraph(),
  sortIndex: i => i,
  format: 'PERCENTAGE'
});
