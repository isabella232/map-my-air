import Ember from 'ember';
import Upload from 'polluted-routes/mixins/upload-mixin';

const {
  Route,
  set,
  get
} = Ember;

export default Route.extend(Upload, {
  actions: {
    upload(file) {
      const uploader = get(this, 'uploader')
      const controller = get(this ,'controller')

      uploader.on('progress', evt => {
        const progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        set(controller, 'progress', progressPercentage)
      })

      uploader.upload(file)
      .then(d => {
        set(controller, 'progress', 100)
        this.transitionTo('view', d.cartodbId)
          .then(set(controller, 'progress', null))
        }, () => {
          // error handling
          console.log('error status: ' + status)
          set(controller, 'progress', null)
      })
    }
  }
})
