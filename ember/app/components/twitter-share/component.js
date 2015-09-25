import Ember from 'ember';

const {
  get,
  Component
} = Ember;

export default Component.extend({
  click() {
    const url = get(this, 'url') || window.location.toString();
    const text = get(this, 'text') || 'Sharing my polluted route';
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;

    window.open(twitterUrl, 'pop', 'width=600, height=400, scrollbars=no');
  }
});
