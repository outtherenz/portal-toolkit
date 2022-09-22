import { JSONAPISerializer } from 'miragejs';

export default JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return attr;
    // return attr.camelize();
  },

  keyForRelationship(attr) {
    return attr;
    // return attr.camelize();
  }
});
