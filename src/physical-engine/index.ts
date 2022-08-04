import CANNON from 'cannon'

import { Synchronizer } from './synchronizer'

// 在物理引擎中创建两种材质
const groundMaterial = new CANNON.Material('default')
const boxMaterial = new CANNON.Material('box')
// 设置两种材质交互时的作用效果
const groundBoxContactMaterial = new CANNON.ContactMaterial(groundMaterial, boxMaterial, {
    friction: 0.1, restitution: 0.3
})

export class PhysicalEngine {
    private world: CANNON.World
    private instances: Array<CANNON.body> = []
    private synchronizers: Array<Synchronizer> = []
    constructor() {
        this.init()
    }

    private init() {
        const world = new CANNON.World();
        world.gravity.set(0, 0, -9.82); // m/s²

        // 创建地面实体
        const groundBody = new CANNON.Body({
            mass: 0, // mass == 0 makes the body static
            material: groundMaterial
        });
        const groundShape = new CANNON.Plane();
        groundBody.addShape(groundShape);
        world.addBody(groundBody);
        world.addContactMaterial(groundBoxContactMaterial)
        world.broadphase = new CANNON.NaiveBroadphase();
        world.solver.iterations = 10;
        this.world = world
    }

    public step(worldStepInterval) {
        // 推进 cannon 中的运算
        this.world.step(worldStepInterval);
        // 将 cannon 中的元算结果同步给 three mesh
        this.synchronizers.forEach(synchronizer => synchronizer.syncConnon2Three())
    }

    public createInstance({ halfExtents }) {
        const shape = new CANNON.Box(new CANNON.Vec3(halfExtents, halfExtents, halfExtents))
        const body = new CANNON.Body({
            mass: 1, // kg
            shape,
            material: boxMaterial,
            fixedRotation: false
        })
        const synchronizer = new Synchronizer()
        this.world.addBody(body)
        this.instances.push(body)
        this.synchronizers.push(synchronizer)
        return { body, synchronizer }
    }

}

export default new PhysicalEngine()
