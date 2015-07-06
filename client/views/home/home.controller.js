'use strict';

angular.module('columbiaWync')
  .controller('HomeCtrl', function ($q, leafletData, CartoDbGeoJsonSrvc) {

    var vm = this;

    $q.all({geoJson:CartoDbGeoJsonSrvc.get({gpxlineId:22}).$promise,leafletMap:leafletData.getMap('leaflet-map')}).then(function(promises){
		L.geoJson(promises.geoJson, {
			style: function(feature) {
				var uk = feature.properties.ukpred;
		        if(uk < 11.7) {
		        	return {color: "#FFFFB2"};
		        } else if (uk > 11.69 && uk < 12.7){
		        	return {color: "#FED976"};
		        } else if (uk > 12.69 && uk < 13.7){
		        	return {color: "#FEB24C"};
		        } else if (uk > 13.69 && uk < 14.7){
		        	return {color: "#FD8D3C"};
		        } else if (uk > 14.69 && uk < 15.7){
		        	return {color: "#FC4E2A"};
		        } else if (uk > 15.69 && uk < 16.7){
		        	return {color: "#E31A1C"};
		        } else {
		        	return {color: "#B10026"};
		        }
		    }
		}).addTo(promises.leafletMap);

		var CartoDB_Positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
			subdomains: 'abcd',
			maxZoom: 19
		});

		CartoDB_Positron.addTo(promises.leafletMap);

    });

    angular.extend(vm, {
      name: 'HomeCtrl',
      center: {
        lat: 40.735,
        lng: -73.96,
        zoom: 11
      }
    });

});
