import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend({
  date: attr('date'),
  importer: belongsTo('user'),

  system: attr('string'),
  systemId: attr('string'),

  includesProfitAndLoss: attr('boolean'),
  includesBalanceSheet: attr('boolean'),
  includesOtherData: attr('boolean'),

  externalBalances: attr('array'),
  manualBalances: attr('array'),

  entity: belongsTo('entity'),

  dateCreated: attr('date'),
  dateModified: attr('date')
});
