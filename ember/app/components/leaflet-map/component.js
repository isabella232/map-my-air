/* global L*/
/* jshint unused: false*/
import Ember from 'ember';
import LeafletMixin from 'map-my-air/mixins/leaflet-mixin';
const {
  get,
  set,
  Component,
  computed
} = Ember;
const { htmlSafe } = Ember.String;

export default Component.extend(LeafletMixin, {
  pollution: computed.alias('geoJson.pollution.pm25Ratio'),
  attributeBindings: ['style'],
  elementId: 'map',
  style: Ember.computed(function() {
      return htmlSafe('height: 800px;')
  }),
  didInsertElement() {
    const map = new L.map('map', {
      center: new L.LatLng(40.735, -73.96),
      zoom: 11,
      scrollWheelZoom: false
    })

    const googleLayer = new L.Google('TERRAIN')
    map.addLayer(googleLayer)

    this.addRouteLegend(map)

    this.setProperties({
      map: map,
      googleLayer: googleLayer
    })
  },
  didRender() {
    const map = get(this, 'map')
    const oldJSON = get(this, 'geoJSON')
    const geoJSONGroup = this.addRouteStyle(get(this, 'geoJson.features'), get(this, 'pollution')).addTo(map)

    if (oldJSON) {
      map.removeLayer(oldJSON)
    }
    if (geoJSONGroup.getBounds().isValid()) {
      map.fitBounds(geoJSONGroup.getBounds(), {reset: true})
    }

    set(this, 'geoJSON', geoJSONGroup)
  },
  click(e) {
    if (e.target.nodeName === 'A') {
      e.preventDefault()
      this.sendAction('openModal', 'faq', 'pm')
    }
  }
})
