/* global L */
import Ember from 'ember';

export default Ember.Mixin.create({
  getChloroplethColor(uk, adjustment) {
    if (uk == null) {
      return '#abadb1'
    }

    if (adjustment) {
      uk = uk * adjustment
    }

    if (uk < 4.1) {
        return "#ffeda0";
    } else if (uk > 4 && uk < 6.1) {
        return "#fed976";
    } else if (uk > 6 && uk < 8.1) {
        return "#feb24c";
    } else if (uk > 8 && uk < 10.1) {
        return "#fd8d3c";
    } else if (uk > 10 && uk < 12.1) {
        return "#fc4e2a";
    } else if (uk > 12 && uk < 14.1) {
        return "#e31a1c";
    } else if (uk > 14 && uk < 16.1) {
        return "#bd0026";
    } else {
        return "#800026";
    }
  },
  getRouteStyle(feature, adjustment) {
    return {
      color: this.getChloroplethColor(feature.properties.ukpred, adjustment),
      lineCap: 'butt',
      opacity: 0.8
    }
  },
  getAdjustedRouteStyle(feature, adjustment) {
    return {
      color: this.getChloroplethColor(feature.properties.ukpred, adjustment),
      lineCap: 'butt',
      opacity: 0.8
    }
  },
  addRouteStyle(geoJSON) {
    //const fn = adjustment ? this.getAdjustedRouteStyle.bind(this) : this.getRouteStyle.bind(this)
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
    const legend = L.control({position: 'bottomright'})

    function onAdd() {
      const div = L.DomUtil.create('div', 'info legend')
      const grades = [0, 4, 4.1, 6, 6.1, 8, 8.1, 10, 10.1, 12, 12.1, 14, 14.1, 16, 16]
      const units = document.createElement('div')
      units.className = 'info-label'
      units.innerHTML = '<a href="#">PM<sub>2.5</sub> &micro;g/m<sup>3</sup></a>'

      div.appendChild(units)

      for (let i = 0; i < grades.length; i++) {
        const labelText = `${grades[i].toFixed(2)}${grades[i + 1] ? `&ndash;${grades[i + 1].toFixed(2)}<br>` : '+'}`
        const label = document.createElement('span')
        const bgColor = this.getChloroplethColor(grades[i] + 1)
        const colorBlock = document.createElement('i')

        colorBlock.style.backgroundColor = bgColor
        label.innerHTML = labelText
        div.appendChild(colorBlock)
        div.appendChild(label)
      }
      return div
    }

    legend.onAdd = onAdd.bind(this)
    legend.addTo(map)
  }
})
