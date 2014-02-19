/**
 * The MediaControl is responsible for displaying the Player controls.
 */

var _ = require('underscore');
var BaseObject = require('../base/base_object');

module.exports = MediaControl = BaseObject.extend({
  events: {
    'click [data-play]': 'play',
    'click [data-pause]': 'pause',
    'click [data-stop]': 'stop',
    'click [data-fullscreen]': 'toggleFullscreen',
    'click [data-seekbar]': 'seek'
  },
  //should we use a default template? if so, should it be an external file or inline?
  template: _.template('<div>MediaControl</div>'), 
  initialize: function() {
    this.listenTo(this.container, 'container:timeupdate', this.updateSeekBar);
  },
  play: function() {
    this.container.play();
  },
  pause: function() {
    this.container.pause();
  },
  stop: function() {
    this.container.stop();
  },
  toggleFullscreen: function() {
    this.trigger('mediacontrol:fullscreen');
  },
  setContainer: function(container) {
    this.stopListening(this.container);
    this.container = container;
    this.listenTo(this.container, 'container:timeupdate', this.updateSeekBar);
  },
  updateSeekBar: function(time) {
    this.$('[data-seekbar]').val(time);
  },
  seek: function() {
    this.container.setCurrentTime(this.$('[data-seekbar]').val());
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
