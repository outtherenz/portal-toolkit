import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';
export default Factory.extend({
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
  email: () => faker.internet.email(),
  hasAcceptedTerms: true,
  agreesToCeo: true,
  mustResetPassword: false,
  role: 'user',
  dateCreated: faker.date.past,
  dateModified: function() { return faker.date.between(this.dateCreated, new Date()); }
});
