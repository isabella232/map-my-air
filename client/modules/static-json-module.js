'use strict';
angular.module('staticJSON', ['ngResource'])
.factory('JsonSrvc', function($resource) {
  return $resource('./data/:fileName.json',{ }, {
    get: {method:'GET', isArray: false},
    getArray: {method:'GET', isArray: true}
  });
})
.factory('CartoDbGeoJsonSrvc', function($resource) {
  return $resource('http://columbia-wnyc.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM gpxline_part where gpxline_id = :gpxlineId',{ }, {
    get: {method:'GET', isArray: false},
    getArray: {method:'GET', isArray: true}
  });
});
