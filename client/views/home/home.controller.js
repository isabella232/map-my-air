'use strict';

/**
 * Main controller
 */
angular.module('columbiaWync').controller('HomeCtrl', function($timeout, $location, Upload) {

    var vm = this;

    angular.extend(this, {
    	riderId:null,
    	file:{},
    	uploadButtonDisabled:false,
    	dynamic:0
    });
    
    vm.queueFile = function(files){
    	if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log(file.name);
                vm.file = file;
            }
        }
    };

    vm.upload = function (isValid) {
    	//prevent double click uploads
    	vm.uploadButtonDisabled = true;

        if (vm.file.name && isValid) {
        	vm.dynamic = 20;
            var upload = Upload.upload({
                url: '/gpxroute',
                fields: {'username': vm.riderId},
                file: vm.file
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                vm.dynamic = 50;
            }).success(function (data, status, headers, config) {
            	vm.dynamic = 89;
            	$timeout(function(){
            		vm.dynamic = 100;
            	},150);
                console.log('file ' + config.file.name + 'uploaded. Response: ' + data.cartodbId);
                $location.search({routeId:data.cartodbId});
            }).error(function (data, status, headers, config) {
            	//TODO we could totally have failure here, need to alert user to failure
                console.log('error status: ' + status);
                vm.dynamic = 0;
            });

            upload.finally(function(){
            	//regardless of success or error, we renable the upload button
            	vm.uploadButtonDisabled = false;
            });
        } else {
        	//@see http://www.technofattie.com/2014/07/01/using-angular-forms-with-controller-as-syntax.html for dealing with formcontroller with controller as syntax
        	angular.forEach(vm.form.$error.required, function(field) {
			    field.$setDirty();
			});

        	//renable after invalidation too
			vm.uploadButtonDisabled = false;
        }

    };
	         
})
/**
 * Google map controller
 */
.controller("GoogleMapsController", function($q, $scope, $route, $routeParams, $location, $timeout,
												 leafletData, CartoDbGeoJsonSrvc, LeafletRouteSrvc) {
        //rememebr, using the new controller as syntax requires defining the controller with an alias in the template
        var vm = this;

        angular.extend(this, {
            name: 'Columbia University Bike and Exposure Tool',
            defaults:{
            	scrollWheelZoom:false
            },
            markers: null, /*{
                m1: {
                    lat: 40.735,
                    lng: -73.96
                }
            },*/
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
            },
            geojson:null,
            //Note: you can call this function manually with angular.element($0).scope().gmc.changeGeojsonStyle(1) to see changes
            changeGeojsonStyle:function(adjustment){
            	//placeholder for a function that could be used to update the styling based on wholesale ukpred changes
            	vm.geojson.setStyle(LeafletRouteSrvc.getAdjustedRouteStyle(adjustment));
            }
        });

		//add the legend
		leafletData.getMap('leaflet-map').then(function(leafletMap){
			LeafletRouteSrvc.addRouteLegend(leafletMap);
		});


		$scope.$on("$routeUpdate",function(){
			//dont update route if we dont have an id
			if(!$routeParams.routeId){
				return;
			}

			$q.all({ 
                geoJson: CartoDbGeoJsonSrvc.get({
                    gpxlineId: $routeParams.routeId
                }).$promise,
                leafletMap: leafletData.getMap('leaflet-map')
            }).then(function(promises) {
            	console.log(promises.geoJson);
                
                vm.geojson = LeafletRouteSrvc.addRouteStyle(promises.geoJson).addTo(promises.leafletMap);
            });
		});

		
       
       //if this is the first load, trigger a route update to check if we have to load routeparams.
       //TODO really? there should be a better way
       if($routeParams.routeId){
       		var routeId = $routeParams.routeId;
       		$location.search({routeId:""});
       		$timeout(function(){
       			$location.search({routeId:routeId});
       		},100);
       } 
        
    });
