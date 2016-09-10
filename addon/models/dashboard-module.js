import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo,
  hasMany
} = DS;

export default Model.extend({
  title: attr('string'),
  visualiser: attr('string'),
  positionX: attr('number'),
  positionY: attr('number'),

  user: belongsTo('user'),
  entity: belongsTo('entity'),

  // Data
  periodType: attr('string'),
  kpis: hasMany('kpi', { inverse: null }),
  accounts: hasMany('account', { inverse: null }),
  entityGroups: hasMany('entityGroup', { inverse: null }),
  entities: hasMany('entity', { inverse: null }),
  includeCurrentEntity: attr('boolean'),

  dateCreated: attr('date'),
  dateModified: attr('date')
});
