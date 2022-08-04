import * as THREE from 'three';
import { textureLoader } from '../utils/global'
import woodpic from './floor_wood.jpeg'
// 创建地板材质
const floorMat = new THREE.MeshStandardMaterial({
    roughness: 0.8,
    color: 0xffffff,
    metalness: 0.2,
    bumpScale: 0.0005
});
// 创建地板纹理
textureLoader.load(woodpic, function (map) {
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 4;
    map.repeat.set(10, 24);
    map.encoding = THREE.sRGBEncoding;
    floorMat.map = map;
    floorMat.needsUpdate = true;
});

// 创建地板网格
export function createPlane() {
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMesh = new THREE.Mesh(floorGeometry, floorMat);
    return floorMesh
}