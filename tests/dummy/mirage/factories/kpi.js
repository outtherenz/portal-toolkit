import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';
export default Factory.extend({
  'intro-line': () => faker.lorem.sentence(),
  description: () => faker.lorem.paragraph(),
  strategies: () => faker.lorem.paragraph(),
  'sort-index': i => i,
  format: 'PERCENTAGE'
});
