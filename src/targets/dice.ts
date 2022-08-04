import * as THREE from 'three';
import physicalEngine from '@src/physical-engine';
import diceObj from './dice.obj'
import { objLoader } from '@src/utils/global'
export function getBoxSize(object) {
    const box = new THREE.Box3().setFromObject(object)
    const xSize = box.max.x - box.min.x
    const ySize = box.max.y - box.min.y
    const zSize = box.max.z - box.min.z
    return { xSize, ySize, zSize }
}
export class Dice {
    public synchronizer
    public threeMesh
    public cannonBody

    static loadModel() {
        return new Promise(resolve => {
            // 没有材质文件，系统自动设置Phong网格材质
            objLoader.load(diceObj, function (obj) {
                //网格模型缩放
                obj.children[0].scale.set(0.1, 0.1, 0.1);
                //网格模型的几何体居中
                obj.children[0].geometry.center();
                resolve(obj)
            })
        })
    }

    constructor(model) {
        const halfExtents = 0.1
        const boxMesh = model
        model.position.set(0, 0, 0.1)
        model.rotation.set(0, 0, 0)
        // 由于模型开始时处于非水平、垂直状态,设置其渲染角度,使其视觉上水平、垂直
        model.children[0].rotation.x = -0.37
        model.children[0].rotation.y = -0.15
        model.children[0].rotation.z = -0.3
        model.castShadow = true
        model.children[0].castShadow = true
        console.log(getBoxSize(model))
        const { body, synchronizer } = physicalEngine.createInstance({ halfExtents })
        synchronizer.init({ threeMesh: boxMesh, cannonBody: body })
        synchronizer.syncThree2Connon()
        this.synchronizer = synchronizer
        this.threeMesh = boxMesh
        this.cannonBody = body
    }

    // 投掷该骰子
    public toll() {
        this.cannonBody.velocity.set(0, 0, 5)
        setTimeout(() => {
            this.cannonBody.angularVelocity.set(
                Math.random() * 8 * Math.PI,
                Math.random() * 8 * Math.PI,
                Math.random() * 8 * Math.PI,
            )
        }, 20);
    }
}

export function createDice(model) {
    return new Dice(model)
}

