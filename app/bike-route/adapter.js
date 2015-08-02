import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'http://columbia-wnyc.cartodb.com',
    namespace: 'api/v2/sql',
    query: '?format=GeoJSON&q=SELECT * FROM gpxline_part where gpxline_id = ',
    urlForFindRecord(id) {
        return [this.host, this.namespace, `${this.query}${id}`].join('/')
    }
})
