import { Model, belongsTo } from 'miragejs';

export default Model.extend({
  parent: belongsTo('account'),
  organisation: belongsTo()
});
