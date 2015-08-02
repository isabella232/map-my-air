/* global L */
import Ember from 'ember';

export default Ember.Mixin.create({
    getChloroplethColor(uk) {
        if (uk < 11.7) {
            return "#FFFFB2";
        } else if (uk > 11.69 && uk < 12.7) {
            return "#FED976";
        } else if (uk > 12.69 && uk < 13.7) {
            return "#FEB24C";
        } else if (uk > 13.69 && uk < 14.7) {
            return "#FD8D3C";
        } else if (uk > 14.69 && uk < 15.7) {
            return "#FC4E2A";
        } else if (uk > 15.69 && uk < 16.7) {
            return "#E31A1C";
        } else {
            return "#B10026";
        }
    },
    getRouteStyle(feature) {
        return {
            color: this.getChloroplethColor(feature.properties.ukpred),
            lineCap: 'butt',
            opacity: 0.8
        }
    },
    addRouteStyle(geoJSON) {
        return L.geoJson(geoJSON, {
            style: this.getRouteStyle.bind(this),
            onEachFeature( feature, layer ) {
                var val = feature.properties.ukpred,
                    text

                if ( val ) {
                    text = `<strong>Value:</strong> ${feature.properties.ukpred}`
                } else {
                    text = 'No data'
                }
                layer.bindPopup(text)
            }
        })
    },
    addRouteLegend(map) {
        var legend = L.control({position: 'bottomright'})

        function onAdd() {
            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 11.7, 12.7, 13.7, 14.7, 15.7, 16.7]

            for (var i = 0; i < grades.length; i++) {

                div.innerHTML +=
                    '<i style="background:' + this.getChloroplethColor(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }
            return div
        }

        legend.onAdd = onAdd.bind(this)
        legend.addTo(map)
    }
})
