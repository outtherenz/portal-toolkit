import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  allowedOrganisations: hasMany('organisation'),
  allowedBranches: hasMany('branch'),
  readOnlyBranches: hasMany('branch'),
  allowedGroups: hasMany('group')
});
