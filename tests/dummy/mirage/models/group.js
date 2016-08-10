import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  members: hasMany('branch'),
  canBeAccessedBy: hasMany('branch'),
  organisation: belongsTo('organisation')
});
