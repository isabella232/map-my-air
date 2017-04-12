/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'map-my-air',
    environment: environment,
    rootURL: '/map-my-air/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      rootElement: '#ember'
    },
    contentSecurityPolicy: {
      'connect-src': 'ws://dev.wnyc.net:* *.cartodb.com *.us-west-2.compute.amazonaws.com www.google-analytics.com',
      'img-src': "'self' *.googleapis.com *.gstatic.com *.google.com *.wnyc.org www.google-analytics.com",
      'script-src': "'self' maps.gstatic.com *.googleapis.com *.google.com media.wnyc.org dev.wnyc.net:* www.google-analytics.com",
      'font-src': "'self' http://fonts.gstatic.com data: media.wnyc.org",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com cloud.typography.com media.wnyc.org"
    },
    host: 'https://cloud1.zevross.com/wnyc/map-my-air',
    cartoHost: 'https://columbia-wnyc.cartodb.com',
    cartoNamespace: 'api/v2/sql',
    metricsAdapters: [{
      name: 'GoogleAnalytics',
      config: {
        id: 'UA-283599-23'
      }
    }]
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
