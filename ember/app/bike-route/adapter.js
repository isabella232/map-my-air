import DS from 'ember-data';
import config from 'polluted-routes/config/environment';

const {
  host
} = config;

export default DS.RESTAdapter.extend({
  urlForFindRecord(id) {
    return `${host}/gpxroute/${id}`
  }
})
