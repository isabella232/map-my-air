'use strict';

angular.module('columbiaWync', [
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngMessages',
  'ui.bootstrap',
  'ngFileUpload',
  'leaflet-directive',
  'staticJSON',
]).config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/',
        reloadOnSearch:false
      });

    $locationProvider.html5Mode(true);

});
