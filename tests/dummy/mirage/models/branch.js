import { Model, belongsTo } from 'miragejs';

export default Model.extend({
  organisation: belongsTo()
});
