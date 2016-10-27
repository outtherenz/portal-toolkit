import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend({
  name: attr('string'),
  introLine: attr('string'),
  description: attr('string'),
  strategies: attr('string'),

  sortIndex: attr('number'),

  format: attr('string'),

  entity: belongsTo('entity'),

  dateCreated: attr('date'),
  dateModified: attr('date')
});
