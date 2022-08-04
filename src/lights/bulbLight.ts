import * as THREE from 'three';
// 光照行为表: http://www.power-sure.com/lumens.htm
const bulbLuminousPowers = {
    "110000 lm (1000W)": 110000,
    "3500 lm (300W)": 3500,
    "1700 lm (100W)": 1700,
    "800 lm (60W)": 800,
    "400 lm (40W)": 400,
    "180 lm (25W)": 180,
    "20 lm (4W)": 20,
    "Off": 0
};
// 创建一个点光源
export function createBulbLight() {
    const bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2);
    bulbLight.add();
    bulbLight.castShadow = true;
    bulbLight.power = 400
    bulbLight.position.set(0, 1, 2);
    return { bulbLight }
}