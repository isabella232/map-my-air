'use strict';

angular.module('columbiaWync')
    .controller('HomeCtrl', function($scope, $q, leafletData, CartoDbGeoJsonSrvc) {

        var vm = this;
        $scope.riderid = 22;

        $scope.grabGPX = function() {
            $q.all({
                geoJson: CartoDbGeoJsonSrvc.get({
                    gpxlineId: $scope.riderid
                }).$promise,
                leafletMap: leafletData.getMap('leaflet-map')
            }).then(function(promises) {
            	console.log(promises.geoJson);
                L.geoJson(promises.geoJson, {
                    style: function(feature) {
                        var uk = feature.properties.ukpred;
                        if (uk < 11.7) {
                            return {
                                color: "#FFFFB2"
                            };
                        } else if (uk > 11.69 && uk < 12.7) {
                            return {
                                color: "#FED976"
                            };
                        } else if (uk > 12.69 && uk < 13.7) {
                            return {
                                color: "#FEB24C"
                            };
                        } else if (uk > 13.69 && uk < 14.7) {
                            return {
                                color: "#FD8D3C"
                            };
                        } else if (uk > 14.69 && uk < 15.7) {
                            return {
                                color: "#FC4E2A"
                            };
                        } else if (uk > 15.69 && uk < 16.7) {
                            return {
                                color: "#E31A1C"
                            };
                        } else {
                            return {
                                color: "#B10026"
                            };
                        }
                    }
                }).addTo(promises.leafletMap);

            });
        };


    })
    .controller("GoogleMapsController", ["$scope", "CartoDbGeoJsonSrvc", function($scope, CartoDbGeoJsonSrvc) {
        var vm = this;
        angular.extend($scope, {
            name: 'Columbia University Bike and Exposure Tool',
            markers: {
                m1: {
                    lat: 40.735,
                    lng: -73.96
                }
            },
            center: {
                lat: 40.735,
                lng: -73.96,
                zoom: 11
            },
            layers: {
                baselayers: {
                    googleTerrain: {
                        name: 'Google Terrain',
                        layerType: 'TERRAIN',
                        type: 'google'
                    },
                    googleHybrid: {
                        name: 'Google Hybrid',
                        layerType: 'HYBRID',
                        type: 'google'
                    },
                    googleRoadmap: {
                        name: 'Google Streets',
                        layerType: 'ROADMAP',
                        type: 'google'
                    }
                }
            }
        });
    }])
