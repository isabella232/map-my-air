import Ember from 'ember';
import service from 'ember-service/inject';

const {
  get,
  Component
} = Ember;

export default Component.extend({
  metrics: service(),
  click() {
    const metrics = get(this, 'metrics')
    const url = get(this, 'url') || window.location.toString();
    const facebookUrl = `https:\/\/www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

    window.open(facebookUrl, 'pop', 'width=600, height=400, scrollbars=no');
    metrics.trackEvent({
      category: 'Share',
      action: 'Facebook',
      label: url
    })
  }
});
