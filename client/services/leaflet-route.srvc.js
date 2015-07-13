'use strict';

/**
 * Service for displaying and processing routes (polylines) in leaflet
 *
 * @http://leafletjs.com/examples/choropleth.html for reference
 */
 angular.module('columbiaWync').service('LeafletRouteSrvc', function(leafletData) {



 	this.getChloroplethColor = function(uk){
 		//ternary might look better, but this is faster
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
 	};

 	this.getRouteStyle = function(){
 		var me = this;
        return function(feature){
        	return {
	        	color: me.getChloroplethColor(feature.properties.ukpred),
	        	lineCap:"butt",
	        	opacity:0.8
        	};
        };
 	};

 	this.getAdjustedRouteStyle = function(adjustment){
 		var me = this;
 		return function(feature){
        	return {
        		color: me.getAdjustedChloroplethColor(feature.properties.ukpred, adjustment),
        		lineCap:"butt",
        		opacity:0.8
        	};
        };
 	}

 	this.addRouteStyle = function(geoJson){
 		var me = this;

 		return L.geoJson(geoJson, {
            style: me.getRouteStyle()
        });
	};

	this.getAdjustedChloroplethColor = function(uk, adjustment){
 		//ternary might look better, but this is faster
        if (uk < 11.7-adjustment) {
            return "#FFFFB2";
        } else if (uk > 11.69-adjustment && uk < 12.7 -adjustment) {
            return "#FED976";
        } else if (uk > 12.69-adjustment && uk < 13.7-adjustment) {
            return "#FEB24C";
        } else if (uk > 13.69-adjustment && uk < 14.7-adjustment) {
            return "#FD8D3C";
        } else if (uk > 14.69-adjustment && uk < 15.7-adjustment) {
            return "#FC4E2A";
        } else if (uk > 15.69-adjustment && uk < 16.7-adjustment) {
            return "#E31A1C";
        } else {
            return "#B10026";
        }
 	};

 });
