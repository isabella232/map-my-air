import DS from 'ember-data';
import config from 'polluted-routes/config/environment';

const {
  dbHost,
  dbNamespace
} = config;

export default DS.RESTAdapter.extend({
  host: dbHost,
  namespace: dbNamespace,
  query: 'format=GeoJSON&q=SELECT * FROM gpxline_part where gpxline_id',
  urlForFindRecord(id) {
    const query = `${this.query}=${id}`
    return `${dbHost}/${dbNamespace}?${query}`
  }
})
