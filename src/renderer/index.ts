import * as THREE from 'three';
import { createPlane } from '@src/meshes/plane'
import { camera } from '@src/cameras/customCamera';
import { createBulbLight } from '@src/lights/bulbLight'
import { createDice, Dice } from '@src/targets/dice'
import { createHemiLight } from '@src/lights/hemiLight'
import physicalEngine from '@src/physical-engine/index'
import { Clock } from '@src/clock/clock'
import { createInteraction } from '@src/interaction/interaction'

// 初始化 WebGL Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
// 物理正确的光照渲染,以下参数可以模拟出更加贴近现实环境的光照效果
renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = Math.pow(0.7, 5.0);

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.enabled = true
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = 'fixed'
renderer.domElement.style.top = '0'
renderer.domElement.style.left = '0'


document.body.appendChild(renderer.domElement);
// 时钟
const clock = new Clock({ physicalEngine, renderEngine: { render } })
clock.start()
clock.setCameraInstance(camera)


// 主场景
const scene = new THREE.Scene();

// 点光源
const { bulbLight } = createBulbLight()
scene.add(bulbLight);

// 半球光源
const { hemiLight } = createHemiLight()
scene.add(hemiLight);

// 地面
const floorMesh = createPlane()
floorMesh.receiveShadow = true;
scene.add(floorMesh);

// 骰子
Dice.loadModel().then(model => {
    const dice = createDice(model)
    scene.add(dice.threeMesh);
    createInteraction(renderer.domElement, scene, dice.threeMesh.children[0].uuid, dice.toll.bind(dice))
    clock.setLookAtTarget(dice)
})

window.onresize = function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
    renderer.render(scene, camera);
}
