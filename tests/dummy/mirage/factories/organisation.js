import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: i => `Organisation ${i}`,
  dateCreated: faker.date.past,
  dateModified: function() { return faker.date.between(this.dateCreated, new Date()); }
});
