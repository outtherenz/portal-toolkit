import { Model, hasMany } from 'miragejs';

export default Model.extend({
  allowedOrganisations: hasMany('organisation'),
  allowedBranches: hasMany('branch'),
  readOnlyBranches: hasMany('branch'),
  allowedGroups: hasMany('group')
});
