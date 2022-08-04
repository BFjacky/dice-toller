import * as THREE from 'three';

// 光照行为表: https://en.wikipedia.org/wiki/Lux
const hemiLuminousIrradiances = {
    "0.0001 lx (Moonless Night)": 0.0001,
    "0.002 lx (Night Airglow)": 0.002,
    "0.5 lx (Full Moon)": 0.5,
    "3.4 lx (City Twilight)": 3.4,
    "50 lx (Living Room)": 50,
    "100 lx (Very Overcast)": 100,
    "350 lx (Office Room)": 350,
    "400 lx (Sunrise/Sunset)": 400,
    "1000 lx (Overcast)": 1000,
    "18000 lx (Daylight)": 18000,
    "50000 lx (Direct Sun)": 50000
};

// 创建一个半球光源
export function createHemiLight() {
    const hemiLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.02);
    hemiLight.intensity = 15;
    return {hemiLight}
}