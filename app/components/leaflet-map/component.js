/* global L*/
/* jshint unused: false*/
import Ember from 'ember';
import LeafletMixin from 'polluted-routes/mixins/leaflet-mixin';

export default Ember.Component.extend(LeafletMixin, {
    attributeBindings: ['style'],
    elementId: 'map',
    style: Ember.computed(function() {
        return 'height: 800px;'
    }),
    didInsertElement() {
        var map = new L.map('map', {
            center: new L.LatLng(40.735, -73.96),
            zoom: 11,
            scrollWheelZoom: false
        })

        var googleLayer = new L.Google('TERRAIN')
        map.addLayer(googleLayer)

        this.addRouteLegend(map)
        this.addRouteStyle(this.get('geoJson.features')).addTo(map)
        this.setProperties({
            map: map,
            googleLayer: googleLayer
        })
    }
})
