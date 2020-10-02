import {
  EventDispatcher,
  MOUSE,
  Quaternion,
  Spherical,
  TOUCH,
  Vector2,
  Vector3
} from "../build/three.module.js"

let PreviewControls = function (object, domElement) {

  this.object = object
  this.domElement = domElement
  this.target = new Vector3()

  this.enabled = true

  this.enablePan = true
  this.panSpeed = 1


  this.update = function () {
    let offset = new Vector3()
    let position = scope.object.position
    offset.copy(position).sub(scope.target)

    scope.target.add( panOffset )
    position.copy( scope.target ).add( offset )
    scope.object.lookAt( scope.target )
    panOffset.set( 0, 0, 0 )
    scope.dispatchEvent(changeEvent)
  }

  let scope = this

  let changeEvent = { type: 'change' }
  let startEvent = { type: 'start' }
  let endEvent = { type: 'end' }

  let pointerStart = new Vector2()
  let pointerEnd = new Vector2()
  let pointerDelta = new Vector2()
  let panOffset = new Vector3()


  function handleMousedown(event) {
    pointerStart.set(event.clientX, event.clientY)
  }

  var panLeft = function () {

    var v = new Vector3()

    return function panLeft(distance, objectMatrix) {

      v.setFromMatrixColumn(objectMatrix, 0) // get X column of objectMatrix
      v.multiplyScalar(- distance)

      panOffset.add(v)

    }

  }()

  var panUp = function () {

    var v = new Vector3()

    return function panUp(distance, objectMatrix) {

      v.setFromMatrixColumn(objectMatrix, 1)

      v.multiplyScalar(distance)

      panOffset.add(v)

    }

  }()

  function pan(deltaX, deltaY) {

    let offset = new Vector3()
    let element = scope.domElement

    // perspective
    let position = scope.object.position
    offset.copy(position).sub(scope.target)
    let targetDistance = offset.length()

    // half of the fov is center to top of screen
    targetDistance *= Math.tan((scope.object.fov / 2) * Math.PI / 180.0)

    // we use only clientHeight here so aspect ratio does not distort speed
    panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix)
    panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix)

  }

  function handleMouseMovePan(event) {
    pointerEnd.set(event.clientX, event.clientY)

    pointerDelta.subVectors(pointerEnd, pointerStart).multiplyScalar(scope.panSpeed)

    pan(pointerDelta.x, pointerDelta.y)

    pointerStart.copy(pointerEnd)

    scope.update()
  }

  function onMouseDown(event) {
    handleMousedown(event)

    scope.domElement.ownerDocument.addEventListener('mousemove', onMouseMove, false)
    scope.domElement.ownerDocument.addEventListener('mouseup', onMouseUp, false)

    scope.dispatchEvent(startEvent)
  }

  function onMouseMove() {
    if (scope.enabled === false) return

    event.preventDefault()

    handleMouseMovePan(event)
    // switch ( state ) {

    // 	case STATE.ROTATE:

    // 		if ( scope.enableRotate === false ) return

    // 		handleMouseMoveRotate( event )

    // 		break

    // 	case STATE.DOLLY:

    // 		if ( scope.enableZoom === false ) return

    // 		handleMouseMoveDolly( event )

    // 		break

    // 	case STATE.PAN:

    // 		if ( scope.enablePan === false ) return

    // 		handleMouseMovePan( event )

    // 		break

    // }
  }

  function onMouseUp() {

    if (scope.enabled === false) return

    scope.domElement.ownerDocument.removeEventListener('mousemove', onMouseMove, false)
    scope.domElement.ownerDocument.removeEventListener('mouseup', onMouseUp, false)

    scope.dispatchEvent(endEvent)

  }

  scope.domElement.addEventListener('mousedown', onMouseDown, false)

}

PreviewControls.prototype = Object.create(EventDispatcher.prototype)
PreviewControls.prototype.constructor = PreviewControls

export default PreviewControls