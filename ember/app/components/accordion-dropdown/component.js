import Ember from 'ember';

const {
  Component,
  computed,
  get,
  set
} = Ember;

export default Component.extend({
  classNames: ['accordion', 'accordion--blank'],
  attributeBindings: ['data-state'],
  'data-state': 'is-collapsed',
  toggleButtonState: computed('data-state', {
    get() {
      const state = get(this, 'data-state')
      if (state === 'is-expanded') {
        return 'second'
      } else {
        return 'first'
      }
    }
  }),

  actions: {
    toggleState() {
      const isExpanded = get(this, 'data-state') === 'is-expanded'
      const newValue = isExpanded ? 'is-collapsed' : 'is-expanded'
      set(this, 'data-state', newValue)
    }
  }
});
