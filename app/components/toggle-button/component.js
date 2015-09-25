import Ember from 'ember';
const {
  Component,
  get,
  set
} = Ember;

export default Component.extend({
  classNames: ['btn', 'btn--blank', 'btn--bluetext', 'btn--toggle'],
  attributeBindings: ['data-state'],
  'data-state': 'first',

  click() {
    const isInFirst = get(this, 'data-state') === 'first'
    const newValue = isInFirst ? 'second' : 'first'

    set(this, 'data-state', newValue)
  }
});
