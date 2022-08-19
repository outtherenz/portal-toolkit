import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  name: i => `Group ${i}`,
  description: 'Group description',
  sortIndex: i => i,
  dateCreated: faker.date.past,
  dateModified: function() { return faker.date.between(this.dateCreated, new Date()); }
});
