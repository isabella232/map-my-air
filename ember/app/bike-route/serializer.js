import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, typeClass, {features, type}, id) {
    return {
      data: {
        id,
        type: 'bike-route',
        attributes: {
          features,
          type
        },
        relationships: {
          timestamp: {
            data: {
              id,
              type: 'start-time'
            }
          },
          pollution: {
            data: {
              id,
              type: 'temporal-adjustment'
            }
          }
        }
      }
    }
  }
})
