import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['l-cover'],
  classNameBindings: ['progress::is-hidden'],
  progressDisplay: Ember.computed('progress', function() {
    return `width: ${this.get('progress')}%;`
  })
})
