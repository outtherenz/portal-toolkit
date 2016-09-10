import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend({
  name: attr('string'),
  code: attr('number'),
  label: attr('string'),

  category: attr('string'),
  debitCredit: attr('string'),
  periodic: attr('boolean'),

  format: attr('string'),
  status: attr('string'),

  isHeading: attr('boolean'),
  parent: belongsTo('account', { inverse: null }),
  sortIndex: attr('number'),

  entity: belongsTo('entity'),

  dateCreated: attr('date'),
  dateModified: attr('date')
});
