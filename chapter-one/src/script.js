import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");
const distanceFromCamera = document.querySelector(".distanceFromCamera");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
const meshGreen = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
const meshBlue = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);

const group1 = new THREE.Group();
group1.scale.set(1, 1, 0.2);
scene.add(group1);

mesh.position.x = -2;
meshGreen.position.x = 0;
meshBlue.position.x = 2;

group1.add(mesh);
group1.add(meshGreen);
group1.add(meshBlue);

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

//axes helper
const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

distanceFromCamera.innerHTML = `Distance from center of cube mesh to camera: ${mesh.position.distanceTo(
  camera.position
)}`;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
