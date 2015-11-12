import Ember from 'ember';

const {
  get,
  Component
} = Ember;

export default Component.extend({
  click() {
    const url = get(this, 'url') || window.location.toString();
    const facebookUrl = `https:\/\/www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

    window.open(facebookUrl, 'pop', 'width=600, height=400, scrollbars=no');
  }
});
