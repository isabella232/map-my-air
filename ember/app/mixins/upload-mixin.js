import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default Ember.Mixin.create({
  uploader: EmberUploader.Uploader.create({
    url: 'http://dev.wnyc.net:4570/gpxroute'
  })
})
