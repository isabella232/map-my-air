import Ember from 'ember';
import service from 'ember-service/inject';
import config from './config/environment';

const { get, run } = Ember;

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: '/map-my-air/',
  metrics: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage()
  },

  _trackPage() {
    run.scheduleOnce('afterRender', this, () => {
      const metrics = get(this, 'metrics')
      const { pathname, hash } = document.location
      const title = this.getWithDefault('currentPath', 'unknown')
      metrics.trackPage({ title, page: `${pathname}${hash}` })
    })
  }
});

Router.map(function() {
  this.route('view', {path: ':bikeRoute_id'})
  this.route('faq', {path: '/faq'})
});

export default Router;
