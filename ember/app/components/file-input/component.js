import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'input',
    attributeBindings: ['type'],
    type: 'file',
    action: 'filesAdded',
    change() {
        this.sendAction('action', this.element.files)
    }
})
