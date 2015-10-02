/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'polluted-routes',
    environment: environment,
    baseURL: '/polluted-routes/',
    locationType: 'auto',
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
      'connect-src': 'ws://dev.wnyc.net:* *.cartodb.com dev.wnyc.net:*',
      'img-src': "'self' *.googleapis.com *.gstatic.com *.google.com dev.wnyc.net:*",
      'script-src': "'self' maps.gstatic.com *.googleapis.com *.google.com dev.wnyc.net:*",
      'font-src': "'self' http://fonts.gstatic.com",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com"
    },
    dbHost: 'http://columbia-wnyc.cartodb.com',
    dbNamespace: 'api/v2/sql'
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
