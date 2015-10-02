import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import config from 'polluted-routes/config/environment';

const {
  dbHost,
  dbNamespace
} = config;

export default Ember.Mixin.create({
  uploader: EmberUploader.Uploader.create({
    url: `${dbHost}/${dbNamespace}/gpxroute`
  })
})
