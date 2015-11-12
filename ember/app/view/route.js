/*global moment*/
import Ember from 'ember';
const { get, RSVP } = Ember;

export default Ember.Route.extend({
  model(params) {
    return RSVP.hash({
      route: this.store.findRecord('bike-route', params.bikeRoute_id),
      startTime: this.store.findRecord('start-time', params.bikeRoute_id)
    })
  },
  setupController(controller, model) {
    //this._super(...arguments)

    controller.set('model', get(model, 'route'))
    const application = this.controllerFor('application')
    const date = get(model, 'startTime.startTimestamp')
    if (date) {
      const formattedDate = moment(date).format('MMMM Do YYYY')
      const formattedTime = moment(date).format('h:mm a')
      application.set('dateTime', `${formattedDate} at ${formattedTime}`)
    } else {
      application.set('dateTime', null)
    }
  }
})

