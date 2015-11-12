import DS from 'ember-data';

export default DS.Serializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id /*, requestType */) {
    return {
      data: {
        type: 'start-time',
        id,
        attributes: {
          startTimestamp: payload.rows[0]['start_timestamp']
        }
      }
    };
  }
});
