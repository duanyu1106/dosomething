import $ from 'jquery'
import JCanvas from 'jcanvas'

class Base {
  constructor() {
    JCanvas($, window)
    $.jCanvas.defaults.fromCenter = false
  }
}

class TimeLiner extends Base {
  constructor(container, width, height) {
    super()

    let $wrap
    if (container instanceof $) {
      $wrap = container
    } else if (container instanceof HTMLElement) {
      $wrap = $(container)
    } else if (typeof container === 'string') {
      $wrap = $(container)
    }

    this.width = width ? width : parseInt($wrap.css('width'))
    this.height = height ? height : parseInt($wrap.css('height'))

    $wrap.html(`<canvas id="TimeLiner">not support canvas element<canvas/>`)
    const $canvas = $wrap.find('#TimeLiner')
    this.$canvas = $canvas

    $canvas.attr({
      width: this.width,
      height: this.height
    }).css({
      display: 'block'
    })

    this.drawBackPanel()
    this.drawToolBar()
    this.drawTrackNames()
    this.drawTracks()
    $canvas.drawLayers()
  }

  drawBackPanel() {
    this.$canvas.addLayer({
      type: 'rectangle',
      index: 0,
      fillStyle: '#000',
      x: 0, y: 0,
      width: this.width, height: this.height,
    })
  }

  drawToolBar() {
    this.$canvas.addLayer({
      type: 'rectangle',
      index: 1,
      fillStyle: '#aaa',
      x: 0, y: 0,
      width: this.width, height: this.height*0.1,
    })
  }

  drawTrackNames() {
    this.$canvas.addLayer({
      type: 'rectangle',
      index: 1,
      fillStyle: '#333',
      x: 0, y: this.height * 0.1,
      width: this.width * 0.2, height: this.height - this.height * 0.1,
    })
  }

  drawTracks() {
    this.$canvas.addLayer({
      type: 'rectangle',
      index: 1,
      fillStyle: '#555',
      x: this.width - this.width * 0.8, y: this.height * 0.1,
      width: this.width * 0.8, height: this.height - this.height * 0.1,
    })
  }
}


export default TimeLiner
