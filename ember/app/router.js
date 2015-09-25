import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: '/polluted-routes/'
});

Router.map(function() {
  //this.route('index', {path: '/'})
  this.route('view', {path: ':bikeRoute_id'})
});

export default Router;
