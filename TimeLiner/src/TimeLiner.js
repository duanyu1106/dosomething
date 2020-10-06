import Container from "./Container";
import Base from "./Base";

export default class TimeLiner extends Base {
  constructor(wrap, width, height) {
    super(wrap, width, height)

    this.backPanel = this.drawBackPanel()
    this.drawToolBar()
    this.drawTrackNames()
    this.drawTracks()
    this.$canvas.drawLayers()
  }

  drawBackPanel() {
    const backPanel = new Container(this.$canvas)
    backPanel.addLayer({
      type: 'rectangle',
      index: 0,
      fillStyle: '#000',
      x: 0, y: 0,
      width: this.width, height: this.height,
    })
    return backPanel
  }

  drawToolBar() {
    const toolBarPanel = new Container(this.$canvas)
    this.backPanel.appendChild(toolBarPanel)
    toolBarPanel.addLayer({
      type: 'rectangle',
      index: 1,
      fillStyle: '#aaa',
      x: 0, y: 0,
      width: this.width, height: this.height * 0.1,
    })
  }

  drawTrackNames() {
    const trackNamePanel = new Container(this.$canvas)
    this.backPanel.appendChild(trackNamePanel, 0, this.height * 0.1)
    trackNamePanel.addLayer({
      type: 'rectangle',
      index: 1,
      fillStyle: '#333',
      x: 0, y: 0,
      width: this.width * 0.2, height: this.height - this.height * 0.1,
    })
    trackNamePanel.addLayer({
      type: 'arc',
      index: 2,
      fillStyle: '#f00',
      x: 0, y: 0,
      radius: 10,
      opacity: 0.5,
      draggable: true,
    })
  }

  drawTracks() {
    const tracksPanel = new Container(this.$canvas)
    this.backPanel.appendChild(tracksPanel, this.width * 0.2, this.height * 0.1)
    tracksPanel.addLayer({
      type: 'rectangle',
      index: 1,
      fillStyle: '#555',
      x: 0, y: 0,
      width: this.width * 0.8, height: this.height - this.height * 0.1,
    })
  }
}

