import DS from 'ember-data';

export default DS.Model.extend({
    features: DS.attr(),
    type: DS.attr('string')
})
