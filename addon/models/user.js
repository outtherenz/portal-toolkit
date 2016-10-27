import DS from 'ember-data';

const {
  Model,
  attr,
  hasMany
} = DS;

export default Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  email: attr('string'),
  password: attr('string'),

  hasAcceptedTerms: attr('boolean'),
  agreesToCeo: attr('boolean'),

  mustResetPassword: attr('boolean'),

  role: attr('string'),
  allowedEntities: hasMany('entity'),
  allowedEntityGroups: hasMany('entity-group'),
  readOnlyEntities: hasMany('entity'),

  canAccessPortal: attr('boolean'),

  dateCreated: attr('date'),
  dateModified: attr('date')
});
