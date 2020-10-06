import JCanvas from "jcanvas";
import $ from "jquery";

/**
 * @desc 产生canvas元素，获取整体画面宽高的基类
 */
export default class Base {
  constructor(wrap, width, height) {
    JCanvas($, window)
    $.jCanvas.defaults.fromCenter = false

    let $wrap
    if (wrap instanceof $) {
      $wrap = wrap
    } else if (wrap instanceof HTMLElement) {
      $wrap = $(wrap)
    } else if (typeof wrap === 'string') {
      $wrap = $(wrap)
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
  }
}
