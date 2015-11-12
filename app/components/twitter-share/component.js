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
    const text = get(this, 'text') || 'Check out air pollution levels on my route. Try @WNYC @Columbia Map My Air.';
    const twitterUrl = `https:\/\/twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`;

    window.open(twitterUrl, 'pop', 'width=600, height=400, scrollbars=no');
    metrics.trackEvent({
      category: 'Share',
      action: 'Facebook',
      label: url
    })
  }
});
