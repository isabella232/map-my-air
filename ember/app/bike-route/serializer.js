import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    isNewSerializerAPI: true,
    normalizeFindRecordResponse(store, typeClass, payload, id, requestType) {

        payload.bikeRoute = { id: id, features: payload.features, type: payload.type }

        delete payload.features
        delete payload.type

        return this._super(store, typeClass, payload, id, requestType)
    }
})
