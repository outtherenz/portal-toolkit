import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';
export default Factory.extend({
  name: i => `Organisation ${i}`,
  dateCreated: faker.date.past,
  dateModified: function() { return faker.date.between(this.dateCreated, new Date()); }
});
