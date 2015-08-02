import Ember from 'ember';
import Upload from 'polluted-routes/mixins/upload-mixin';

export default Ember.Controller.extend(Upload, {
    uploadDisabled: Ember.computed.bool('progress'),
    actions: {
        filesAdded(files) {
            this.set('file', files[0])
        },
        upload() {
            this.uploader.on('progress', evt => {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                this.set('progress', progressPercentage)
            })

            this.uploader.upload(this.get('file'))
                .then( d => {
                    this.set('progress', 100)
                    this.transitionToRoute('view', d.cartodbId)
                        .then(this.set('progress', null))
                }, () => {
                    // error handling
                    console.log('error status: ' + status)
                    this.set('progress', null)
                })
        }
    }
})
