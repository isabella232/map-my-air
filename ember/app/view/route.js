/*global moment*/
import Ember from 'ember';
const { get } = Ember;

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('bike-route', params.bikeRoute_id)
  },
  setupController(controller, model) {
    this._super(...arguments)

    const application = this.controllerFor('application')
    const date = get(model, 'dateTime')
    const formattedDate = moment(date).format('MMMM Do YYYY')
    const formattedTime = moment(date).format('h:mm a')
    application.set('dateTime', `${formattedDate} at ${formattedTime}`)
  }
})

