import Ember from 'ember';
import Upload from 'polluted-routes/mixins/upload-mixin';

const {
  Route,
  set,
  get,
  $
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
        set(controller, 'routeId', d.cartodbId)
        this.transitionTo('view', d.cartodbId)
          .then(() => {set(controller, 'progress', null)})
        }, () => {
          // error handling
          console.log('error status: ', arguments)
          set(controller, 'progress', null)
      })
    },
    openModal(modalName, scrollTo) {
      $(document.body).addClass('is-openmodal')

      if (scrollTo) {
        Ember.run.schedule('afterRender', this, () => {
          $(`#${scrollTo}`).get(0).scrollIntoView()
        })
      }

      return this.render(modalName, {
        into: 'application',
        outlet: 'modal'
      })
    },
    closeModal() {
      $(document.body).removeClass('is-openmodal')
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
})
