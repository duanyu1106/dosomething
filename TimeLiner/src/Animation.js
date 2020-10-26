import {AnimationMixer, AnimationClip, Clock} from "three"
import * as THREE from "three";

export default class Animation {
  constructor(tracksInfo, object) {
    this.actions = []
    this.tracksInfo = tracksInfo
    this.object = object
    this.maxTime = 3

    const mixer = this._generateMixer()
    const clip = this._generateClip()
    this.actions.push(mixer.clipAction(clip))
  }

  _generateMixer() {
    return new AnimationMixer(this.object)
  }

  _generateClip() {
    const tracks = []
    this.tracksInfo.forEach(info => {
      tracks.push(new info.type(info.propertyPath, info.time, info.value, info.interpolation))
    })
    return new AnimationClip('clip', this.maxTime, tracks)
  }

  play() {
    this.stop()
    this.actions.forEach(action => {
      action.play()
    })
    const self = this
    const clock = new Clock()
    ;(function update() {
      self.update(clock.getDelta())
      if (clock.getElapsedTime() <= self.maxTime) {
        requestAnimationFrame(update)
      } else {
        self.stop()
      }
    })()
  }

  update(delta) {
    this.actions.forEach(action => {
      action.getMixer().update(delta)
    })
  }

  stop() {
    this.actions.forEach(action => {
      action.stop()
    })
  }
}
