import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  user: belongsTo(),
  organisation: belongsTo(),
  kpis: hasMany('kpi'),
  accounts: hasMany('account'),
  groups: hasMany('group'),
  branches: hasMany('branch')
});
