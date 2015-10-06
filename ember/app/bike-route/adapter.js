import DS from 'ember-data';
import config from 'polluted-routes/config/environment';

const {
  cartoHost,
  cartoNamespace
} = config;

export default DS.RESTAdapter.extend({
  host: cartoHost,
  namespace: cartoNamespace,
  urlForFindRecord(id) {
    const query = `SELECT * FROM gpxline_part where gpxline_id = ${id}`
    return `${this.host}/${this.namespace}/?q=${query}&format=GeoJSON`
  }
})
