import Ember from 'ember';

const {
  get,
  computed
} = Ember;

export default Ember.Component.extend({
  showButtons: computed('route', {
    get() {
      const route = get(this, 'route')
      if (route === 'index') {
        return false
      } else if (route === 'view') {
        return true
      }
    }
  })
});
