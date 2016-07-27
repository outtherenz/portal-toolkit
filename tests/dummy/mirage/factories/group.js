import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: i => `Group ${i}`,
  description: 'Group description',
  sortIndex: i => i,
  dateCreated: () => faker.date.past(),
  dateModified: () => faker.date.between(this.dateCreated, new Date())
});
