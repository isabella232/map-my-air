import Ember from 'ember';

const {
  Component,
  $,
  set,
  get,
  computed
} = Ember;

export default Component.extend({
  classNames: ['upload-controls'],
  uploadDisabled: computed.bool('progress'),

  didInsertElement() {
    set(this, 'fileInput', $('#fileInput'))
  },

  change() {
    const $fileInput = get(this, 'fileInput')
    const file = $fileInput.get(0).files[0]
    const fileName = get(file, 'name')

    set(this, 'hasFile', true)
    set(this, 'file', file)
    set(this, 'fileName', fileName)
  },

  actions: {
    chooseFile() {
      const $fileInput = get(this, 'fileInput')
      $fileInput.click()
    },
    upload() {
      const file = get(this, 'file')
      this.sendAction('action', file)
    }
  }
});
