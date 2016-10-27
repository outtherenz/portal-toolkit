import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo,
  hasMany
} = DS;

export default Model.extend({
  name: attr('string'),
  description: attr('string'),

  consolidation: attr('boolean'),

  parentEntity: belongsTo('entity'),
  members: hasMany('entity'),
  canBeAccessedBy: hasMany('entity'),

  sortIndex: attr('number'),

  dateCreated: attr('date'),
  dateModified: attr('date')
});
