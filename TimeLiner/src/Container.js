/**
 * 容器类，有独立的坐标系
 */
export default class Container {
  constructor($canvas, x = 0, y = 0) {
    this.$canvas = $canvas
    this.x = x
    this.y = y
    this.offsetX = 0
    this.offsetY = 0
    this.parent = null
  }

  addLayer(prop) {
    if (prop.hasOwnProperty('x')) {
      prop.x += this.parent ? this.parent.x + this.offsetX + this.x : this.x
    }
    if (prop.hasOwnProperty('y')) {
      prop.y += this.parent ? this.parent.y + this.offsetY + this.y : this.y
    }
    this.$canvas.addLayer(prop)
  }

  appendChild(child, offsetX = 0, offsetY = 0) {
    this.child = child
    this.child.parent = this
    child.offsetX = offsetX
    child.offsetY = offsetY
  }
}
