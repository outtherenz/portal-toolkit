import { Model, hasMany, belongsTo } from 'miragejs';

export default Model.extend({
  members: hasMany('branch'),
  canBeAccessedBy: hasMany('branch'),
  organisation: belongsTo('organisation')
});
