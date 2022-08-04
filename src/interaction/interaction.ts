import * as THREE from 'three'
import { camera } from '@src/cameras/customCamera'
import { downEvent, moveEvent, upEvent, commonEvent } from '@src/cameras/event'

const raycaster = new THREE.Raycaster()

// 将浏览器视窗坐标系下的坐标转换为 Canvas 坐标系下的坐标
function normalizePosition(event = {}, containerRect) {
    const normalizedPosition: { x?: number, y?: number } = {}
    normalizedPosition.x = (commonEvent(event).x / containerRect.width) * 2 - 1
    normalizedPosition.y = (commonEvent(event).y / containerRect.height) * -2 + 1
    return normalizedPosition
}


export function createInteraction(canvas, mainScene, diceId, callback) {
    window.addEventListener(downEvent, (e) => {
        const { x, y } = normalizePosition(e, {
            width: canvas.width / window.devicePixelRatio,
            height: canvas.height / window.devicePixelRatio,
        })
        // 从点击的位置,沿着摄像头的方向发出一条射线
        raycaster.setFromCamera({ x, y }, camera)
        // 获得与射线相交的物体
        const intersectionObjects = raycaster.intersectObjects(mainScene.children)
        if (intersectionObjects.find(item => item.object.uuid === diceId)) {
            callback()
        }
    })
}

