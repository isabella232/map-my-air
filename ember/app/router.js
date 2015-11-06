import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: '/map-my-air/'
});

Router.map(function() {
  this.route('view', {path: ':bikeRoute_id'})
  this.route('faq', {path: '/faq'})
});

export default Router;
