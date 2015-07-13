'use strict';

	angular.module('columbiaWync')
  .config(function ($routeProvider) {
  	//TODO we could upgrade to angular ui router for more specific param mappings
    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'hc',
        //we use the search property to determine what geojson layer is displayed, but we wont need to reload the map
        reloadOnSearch: false
      });
  });
