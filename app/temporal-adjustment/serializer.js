import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, typeClass, payload, id) {
    return {
      data: {
        type: 'temporal-adjustment',
        id,
        attributes: {
          pm25Ratio: payload.rows ? payload.rows[0]['pm25_ratio'] : null
        }
      }
    }
  }
})
