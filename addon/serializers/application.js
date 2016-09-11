import DS from 'ember-data';

const { JSONAPISerializer } = DS;

export default JSONAPISerializer.extend({
  isNewSerializerAPI: true,

  keyForAttribute(key, method) {
    return key.camelize();
  },

  keyForRelationship(key, method) {
    return key.camelize();
  }
});
