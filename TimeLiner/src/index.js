import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {TransformControls} from "three/examples/jsm/controls/TransformControls"
import TimeLiner from "./TimeLiner"
import crate from './textures/crate.gif'
import Animation from "./Animation"

let wrap = document.getElementById('wrap')
new TimeLiner(wrap)
let camera, scene, renderer, control, orbit, animation, clock

init()
render()

function init() {

  renderer = new THREE.WebGLRenderer({antialias: true})
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  //

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 3000)
  camera.position.set(1000, 500, 1000)
  camera.lookAt(0, 200, 0)

  scene = new THREE.Scene()
  scene.add(new THREE.GridHelper(1000, 10))

  let light = new THREE.DirectionalLight(0xffffff, 2)
  light.position.set(1, 1, 1)
  scene.add(light)


  let texture = new THREE.TextureLoader().load(crate, function(){})
  texture.mapping = THREE.UVMapping
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy()

  let geometry = new THREE.BoxBufferGeometry(200, 200, 200)
  let material = new THREE.MeshLambertMaterial({map: texture})

  orbit = new OrbitControls(camera, renderer.domElement)
  orbit.update()

  // orbit.addEventListener('change', render)

  control = new TransformControls(camera, renderer.domElement)
  // control.addEventListener('change', render)
  control.addEventListener('dragging-changed', function (event) {

    orbit.enabled = !event.value

  })

  let mesh = new THREE.Mesh(geometry, material)
  mesh.name = "MyBox"
  scene.add(mesh)

  control.attach(mesh)
  scene.add(control)

  window.addEventListener('resize', onWindowResize, false)

  window.addEventListener('keydown', function (event) {

    switch (event.code) {

      case 'Space':
        animation.play()
        break

      case 'KeyQ': // Q
        control.setSpace(control.space === "local" ? "world" : "local")
        break

      case 'ControlLeft': // Ctrl
        control.setTranslationSnap(100)
        control.setRotationSnap(THREE.MathUtils.degToRad(15))
        break

      case 'KeyW': // W
        control.setMode("translate")
        break

      case 'KeyE': // E
        control.setMode("rotate")
        break

      case 'KeyR': // R
        control.setMode("scale")
        break

      case 'Equal':
      case 'NumpadAdd': // +, =, num+
        control.setSize(control.size + 0.1)
        break

      case 'Minus':
      case 'NumpadSubtract': // -, _, num-
        control.setSize(Math.max(control.size - 0.1, 0.1))
        break

    }

  })

  window.addEventListener('keyup', function (event) {

    switch (event.code) {

      case 'ControlLeft': // Ctrl
        control.setTranslationSnap(null)
        control.setRotationSnap(null)
        break

    }

  })

  let trackInfo = [

    {
      type: THREE.VectorKeyframeTrack,
      propertyPath: 'MyBox.position',
      time: [0, 3],
      value: [0, 0, 0, 0, 500, 0],
      interpolation: THREE.InterpolateLinear
    },

    {
      type: THREE.QuaternionKeyframeTrack,
      propertyPath: 'MyBox.quaternion',
      time: [0, 3],
      value: [0, 0, 0, 1, 1, 1, 1, 1],
      interpolation: THREE.InterpolateLinear

    }

  ]

  animation = new Animation(trackInfo, mesh)
  // animation.play()
  // new Timeliner( new TimelinerController( scene, trackInfo, render ) )

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)

  render()

}

function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
