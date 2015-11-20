import DS from 'ember-data';
import config from 'map-my-air/config/environment';

const {
  cartoHost,
  cartoNamespace
} = config;

export default DS.RESTAdapter.extend({
  host: cartoHost,
  namespace: cartoNamespace,
  urlForFindRecord(id) {
    const query = `SELECT t.pm25_ratio FROM temporal_adjustment t join (
      select extract(hour from g.start_timestamp) as hour,(CASE EXTRACT(
      DOW from g.start_timestamp) WHEN 6 THEN 'Weekend' WHEN 0 THEN 'Weekend'
      ELSE 'Weekday' END) as weekday,extract(DOY from g.start_timestamp) as doy
      from gpxline g where g.cartodb_id = ${id}) a on t.utc_hour = a.hour and 
      t.weekday = a.weekday and(case when a.doy > 334 or a.doy < 60 then 'Winter' 
      when a.doy between 59 and 152 then 'Spring' when a.doy between 151 and 244 
      then 'Summer' else 'Fall' end)= t.season`
    return `${this.host}/${this.namespace}/?q=${query}&format=JSON`
  }
})

