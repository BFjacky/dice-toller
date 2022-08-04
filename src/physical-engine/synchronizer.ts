import CANNON from 'cannon'
// three、cannon 状态同步器
export class Synchronizer {
    private threeMesh
    private cannonBody: CANNON.body
    constructor(params?: { threeMesh?: any, cannonBody?: CANNON.body }) {
        if (params) {
            this.threeMesh = params.threeMesh
            this.cannonBody = params.cannonBody
        }
    }

    public init({ threeMesh, cannonBody }) {
        if (threeMesh) this.threeMesh = threeMesh
        if (cannonBody) this.cannonBody = cannonBody
    }

    // 将物理引擎中的数据状态同步给渲染引擎
    public syncConnon2Three() {
        this.threeMesh.position.x = this.cannonBody.position.x
        this.threeMesh.position.y = this.cannonBody.position.y
        this.threeMesh.position.z = this.cannonBody.position.z
        this.threeMesh.quaternion.set(
            this.cannonBody.quaternion.x,
            this.cannonBody.quaternion.y,
            this.cannonBody.quaternion.z,
            this.cannonBody.quaternion.w,
        )
    }

    // 将渲染引擎中的数据状态同步给物理引擎
    public syncThree2Connon() {
        this.cannonBody.position.x = this.threeMesh.position.x
        this.cannonBody.position.y = this.threeMesh.position.y
        this.cannonBody.position.z = this.threeMesh.position.z
        this.cannonBody.quaternion.set(
            this.threeMesh.quaternion.x,
            this.threeMesh.quaternion.y,
            this.threeMesh.quaternion.z,
            this.threeMesh.quaternion.w,
        )
    }
}
