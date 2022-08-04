import * as THREE from 'three'
import { downEvent, moveEvent, upEvent, commonEvent } from './event'
// 创建一个透视投影相机
const fov = 45
const aspect = window.innerWidth / window.innerHeight; // 2 // the canvas default
const near = 0.1
const far = 100
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
// 控制相机位移时的旋转半径
const cameraOrbitRadius = 3
let baseXYRadian = -Math.PI / 2
let xyRadian = -Math.PI / 2
let baseZHeight = cameraOrbitRadius
let zHeight = baseZHeight
// 更新相机位置,但使相机始终看向{x:0,y:0,z:0}
function updateCameraPosition() {
    camera.position.set(
        cameraOrbitRadius * Math.cos(xyRadian),
        cameraOrbitRadius * Math.sin(xyRadian),
        zHeight,
    )
    camera.up.x = 0
    camera.up.y = 0
    camera.up.z = 1
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    camera.updateProjectionMatrix()
}
updateCameraPosition()

// 监听事件控制相机位移
let startX, startY
window.addEventListener(downEvent, (e) => {
    startX = commonEvent(e).x
    startY = commonEvent(e).y
})
window.addEventListener(moveEvent, (e) => {
    if (startX === undefined) return
    const deltaX = -(commonEvent(e).x - startX)
    const deltaY = commonEvent(e).y - startY
    xyRadian = baseXYRadian + deltaX / 100
    zHeight = baseZHeight + deltaY / 10
    zHeight = Math.min(Math.max(0.1, zHeight), cameraOrbitRadius * 2)
    updateCameraPosition()
})
window.addEventListener(upEvent, (e) => {
    baseXYRadian = xyRadian
    baseZHeight = zHeight
    startX = undefined
    startY = undefined
})

export { camera }