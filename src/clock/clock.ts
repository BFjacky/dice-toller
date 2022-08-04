import { PhysicalEngine } from '@src/physical-engine/index'
// 自定义一个时钟,触发 three 的渲染和物理引擎的运行
export class Clock {
    private physicalEngine: PhysicalEngine
    private renderEngine: any
    private worldStepInterval = 1 / 60
    private lookAtTarget: any
    private camera: any
    constructor({ physicalEngine, renderEngine }) {
        this.physicalEngine = physicalEngine
        this.renderEngine = renderEngine
    }

    setLookAtTarget(lookAtTarget) {
        this.lookAtTarget = lookAtTarget
    }

    setCameraInstance(camera) {
        this.camera = camera
    }

    step() {
        // 更新相机看向的位置
        if (this.lookAtTarget) {
            this.camera.lookAt(this.lookAtTarget.threeMesh.position)
            this.camera.updateProjectionMatrix()
        }
        this.physicalEngine.step(this.worldStepInterval)
        this.renderEngine.render()
    }

    start() {
        setInterval(() => {
            this.step()
        }, this.worldStepInterval * 1000)
    }
}
