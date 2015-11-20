import DS from 'ember-data';

export default DS.Model.extend({
  features: DS.attr(),
  type: DS.attr('string'),
  timestamp: DS.belongsTo('start-time', {async: true}),
  pollution: DS.belongsTo('temporal-adjustment', {async: true})
})
