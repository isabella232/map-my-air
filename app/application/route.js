import Ember from 'ember';
import service from 'ember-service/inject';
import Upload from 'map-my-air/mixins/upload-mixin';

const {
  Route,
  set,
  get,
  $
} = Ember;

export default Route.extend(Upload, {
  metrics: service(),
  actions: {
    upload(file) {
      const uploader = get(this, 'uploader')
      const controller = get(this ,'controller')
      const metrics = get(this, 'metrics')
      const now = Date.now()

      uploader.on('progress', evt => {
        const progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        set(controller, 'progress', progressPercentage)
      })

      uploader.upload(file)
      .then(d => {
        set(controller, 'progress', 100)
        set(controller, 'routeId', d.cartodbId)

        metrics.trackEvent({
          category: 'Map My Air',
          action: 'Upload',
          label: `finished ${file.name}: ${now}`,
          value: d.cartodbId
        })

        this.transitionTo('view', d.cartodbId)
          .then(() => {set(controller, 'progress', null)})
        }, () => {
          // error handling
          set(controller, 'progress', null)

          metrics.trackEvent({
            category: 'Map My Air',
            action: 'Upload',
            label: `errored ${file.name}: ${now}`
          })

          alert("There was an error uploading your file. Please ensure it is a valid GPX file.")
      })

      metrics.trackEvent({
        category: 'Map My Air',
        action: 'Upload',
        label: `started ${file.name}: ${now}`
      })
    },
    openModal(modalName, scrollTo) {
      const metrics = get(this, 'metrics')

      $(document.body).addClass('is-openmodal')

      if (scrollTo) {
        Ember.run.schedule('afterRender', this, () => {
          $(`#${scrollTo}`).get(0).scrollIntoView()
        })
      }

      metrics.trackEvent({
        category: 'Map My Air',
        action: 'Modal',
        label: 'Open Modal',
      })

      return this.render(modalName, {
        into: 'application',
        outlet: 'modal'
      })
    },
    closeModal() {
      const metrics = get(this, 'metrics')

      $(document.body).removeClass('is-openmodal')

      metrics.trackEvent({
        category: 'Map My Air',
        action: 'Modal',
        label: 'Close Modal'
      })

      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
})
