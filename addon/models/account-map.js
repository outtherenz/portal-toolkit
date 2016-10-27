import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend({
  account: belongsTo('account'),

  system: attr('string'),
  systemId: attr('string'),

  externalId: attr('string'),
  name: attr('string'),
  code: attr('string'),

  inverted: attr('boolean'),

  entity: belongsTo('entity'),

  dateCreated: attr('date'),
  dateModified: attr('date')
});
