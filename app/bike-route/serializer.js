import DS from 'ember-data';
import Ember from 'ember';

const { get } = Ember;

export default DS.RESTSerializer.extend({
  isNewSerializerAPI: true,
  normalizeFindRecordResponse(store, typeClass, payload, id, requestType) {

    payload.bikeRoute = {
      id: id,
      features: payload.features,
      type: payload.type,
      dateTime: get(payload, 'features.firstObject.properties.created_at')
    }

    delete payload.features
    delete payload.type

    return this._super(store, typeClass, payload, id, requestType)
  }
})
