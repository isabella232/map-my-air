import Ember from 'ember';
const { computed } = Ember;
const { htmlSafe } = Ember.String;

export default Ember.Component.extend({
  classNames: ['l-cover'],
  classNameBindings: ['progress::is-hidden'],
  progressDisplay: computed('progress', {
    get() {
      return htmlSafe(`width: ${this.get('progress')}%;`)
    }
  })
})
