import Ember from 'ember';

const {
  Component,
  $,
  set,
  get,
  computed,
  observer
} = Ember;

export default Component.extend({
  classNames: ['upload-controls'],
  uploadDisabled: computed.bool('progress'),
  dynamicLabel: 'Upload your biking data',

  updateLabel: observer('routeId', function() {
    const hasFile = get(this, 'hasFile')
    const $fileInput = get(this, 'fileInput')
    if (hasFile) {
      set(this, 'dynamicLabel', 'Upload another route')
      set(this, 'hasFile', false)
      window.debugInput = $fileInput
    }
  }),

  didInsertElement() {
    set(this, 'fileInput', $('#fileInput'))
  },

  change() {
    const $fileInput = get(this, 'fileInput')
    const file = $fileInput.get(0).files[0]
    if (!file) {
      return
    }
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
