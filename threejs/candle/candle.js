import {
  Mesh,
  Group,
  CylinderBufferGeometry,
  MeshLambertMaterial
} from "../build/three.module.js";

class Candle {
  constructor(radius, height, radialSegments) {
    let candle = new Group()

    // 底部主体
    let bodyGeometry = new CylinderBufferGeometry(radius, radius, height, radialSegments)
    let bodyMaterial = new MeshLambertMaterial({color: 0xd2691e})
    let body = new Mesh(bodyGeometry, bodyMaterial)
    candle.add(body)

    // 烛芯
    let threadGeometry = new CylinderBufferGeometry(radius / 10, radius/10, height/5, radialSegments)
    let threadMaterial = new MeshLambertMaterial({color: 0xffffff})
    let thread = new Mesh(threadGeometry, threadMaterial)
    thread.position.set(0,height/2,0)
    candle.add(thread)

    return candle
  }
}

export default Candle
