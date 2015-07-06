'use strict';

angular.module('columbiaWync', [
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'leaflet-directive',
  'staticJSON'
]).config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/app'
      });

    $locationProvider.html5Mode(true);

});
