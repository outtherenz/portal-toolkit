import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo,
  hasMany
} = DS;

export default Model.extend({
  name: attr('string'),

  system: attr('string'),

  canAccessEntityGroups: hasMany('entity-group', { inverse: null }),

  firstClosedPeriod: attr('date'),

  parent: belongsTo('entity', { inverse: null }),

  dateCreated: attr('date'),
  dateModified: attr('date')
});
