/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'map-my-air',
    environment: environment,
    baseURL: '/map-my-air/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      rootElement: '#ember'
    },
    contentSecurityPolicy: {
      'connect-src': 'ws://dev.wnyc.net:* *.cartodb.com *.us-west-2.compute.amazonaws.com',
      'img-src': "'self' *.googleapis.com *.gstatic.com *.google.com *.wnyc.org",
      'script-src': "'self' maps.gstatic.com *.googleapis.com *.google.com media.wnyc.org dev.wnyc.net:*",
      'font-src': "'self' http://fonts.gstatic.com data: media.wnyc.org",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com cloud.typography.com media.wnyc.org"
    },
    host: 'http://ec2-52-27-37-89.us-west-2.compute.amazonaws.com',
    cartoHost: 'http://columbia-wnyc.cartodb.com',
    cartoNamespace: 'api/v2/sql'
  };

  if (environment === 'development') {
    ENV.contentSecurityPolicy['script-src'] += " 'unsafe-eval'"
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
