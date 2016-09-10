import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend({
  account: belongsTo('account'),
  kpi: belongsTo('kpi'),

  date: attr('date'),

  values: attr(),
  breakdown: attr(),

  entity: belongsTo('entity'),

  dateCreated: attr('date'),
  dateModified: attr('date')
});
